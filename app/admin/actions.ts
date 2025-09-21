'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  AppConfig,
  ProductColorOption,
  ProductConfig,
  ProductFeature,
  ProductSpecification,
  StoreConfig,
  defaultAppConfig,
} from '../../lib/app-config';
import {
  changeAdminPassword,
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyPassword,
} from '../../lib/auth';
import { getAppConfig, saveAppConfig } from '../../lib/config';

type LoginState = { error?: string };

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const successState: ActionState = { status: 'success', message: 'Đã lưu cấu hình.' };
const unauthorizedState: ActionState = { status: 'error', message: 'Bạn không có quyền thực hiện thao tác này.' };

const LINK_FIELDS = ['label', 'href'] as const;
const COLOR_FIELDS = ['id', 'name', 'swatchClasses', 'image'] as const;
const SPEC_FIELDS = ['icon', 'label', 'value'] as const;
const FEATURE_FIELDS = ['icon', 'title', 'description'] as const;

function collectIndexedObjects<TField extends string>(
  formData: FormData,
  group: string,
  fields: readonly TField[]
): Array<Partial<Record<TField, string>>> {
  const regex = new RegExp(`^${group}\\[(\\d+)\\]\\[(${fields.join('|')})\\]$`);
  const results = new Map<number, Partial<Record<TField, string>>>();

  formData.forEach((value, key) => {
    if (typeof value !== 'string') {
      return;
    }
    const match = regex.exec(key);
    if (!match) {
      return;
    }
    const index = Number(match[1]);
    const field = match[2] as TField;
    const entry = results.get(index) ?? ({} as Partial<Record<TField, string>>);
    entry[field] = value.trim();
    results.set(index, entry);
  });

  return Array.from(results.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, entry]) => entry);
}

function collectIndexedValues(formData: FormData, group: string): string[] {
  const regex = new RegExp(`^${group}\\[(\\d+)\\]$`);
  const values: Array<{ index: number; value: string }> = [];

  formData.forEach((value, key) => {
    if (typeof value !== 'string') {
      return;
    }
    const match = regex.exec(key);
    if (!match) {
      return;
    }
    values.push({ index: Number(match[1]), value: value.trim() });
  });

  return values
    .sort((a, b) => a.index - b.index)
    .map((item) => item.value)
    .filter((entry) => entry.length > 0);
}

function parseLinkArray(formData: FormData, key: string) {
  const entries = collectIndexedObjects(formData, key, LINK_FIELDS);
  return entries
    .map((entry) => ({
      label: entry.label ?? '',
      href: entry.href ?? '',
    }))
    .filter((entry) => entry.label.length > 0 && entry.href.length > 0);
}

function parseColors(formData: FormData): ProductColorOption[] {
  const entries = collectIndexedObjects(formData, 'colors', COLOR_FIELDS);
  return entries
    .map((entry) => ({
      id: entry.id ?? '',
      name: entry.name ?? '',
      swatchClasses: entry.swatchClasses ?? '',
      image: entry.image ?? '',
    }))
    .filter((entry) => entry.id.length > 0 && entry.name.length > 0 && entry.image.length > 0);
}

function parseSpecifications(formData: FormData): ProductSpecification[] {
  const entries = collectIndexedObjects(formData, 'specifications', SPEC_FIELDS);
  return entries
    .map((entry) => ({
      icon: (entry.icon ?? 'palette') as ProductSpecification['icon'],
      label: entry.label ?? '',
      value: entry.value ?? '',
    }))
    .filter((entry) => entry.label.length > 0 && entry.value.length > 0);
}

function parseFeatures(formData: FormData): ProductFeature[] {
  const entries = collectIndexedObjects(formData, 'features', FEATURE_FIELDS);
  return entries
    .map((entry) => ({
      icon: entry.icon ?? '🌿',
      title: entry.title ?? '',
      description: entry.description ?? '',
    }))
    .filter((entry) => entry.title.length > 0 && entry.description.length > 0);
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = (formData.get('password') as string | null)?.trim() ?? '';
  if (!password) {
    return { error: 'Vui lòng nhập mật khẩu.' };
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return { error: 'Mật khẩu không chính xác.' };
  }

  await createAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect('/admin');
}

export async function updateStoreAction(_prev: ActionState | undefined, formData: FormData): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedState;
  }

  const current = await getAppConfig();
  const productLinks = parseLinkArray(formData, 'productLinks');
  const supportLinks = parseLinkArray(formData, 'supportLinks');
  const heroHighlights = collectIndexedValues(formData, 'heroHighlights');
  const updatedStore: StoreConfig = {
    name: (formData.get('name') as string | null)?.trim() || current.store.name,
    tagline: (formData.get('tagline') as string | null)?.trim() || '',
    heroHighlights: heroHighlights.length > 0 ? heroHighlights : current.store.heroHighlights,
    contact: {
      hotline: (formData.get('hotline') as string | null)?.trim() || '',
      email: (formData.get('email') as string | null)?.trim() || '',
      address: (formData.get('address') as string | null)?.trim() || '',
    },
    productLinks,
    supportLinks,
    legal: (formData.get('legal') as string | null)?.trim() || '',
  };

  const updated: AppConfig = {
    ...current,
    store: updatedStore,
  };

  try {
    await saveAppConfig(updated);
    revalidatePath('/');
    revalidatePath('/product');
    revalidatePath('/admin');
    return successState;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Không thể lưu cấu hình.',
    };
  }
}

export async function updateProductAction(_prev: ActionState | undefined, formData: FormData): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedState;
  }

  const current = await getAppConfig();
  const colors = parseColors(formData);
  const specifications = parseSpecifications(formData);
  const features = parseFeatures(formData);
  const benefits = collectIndexedValues(formData, 'benefits');

  const product: ProductConfig = {
    colors: colors.length > 0 ? colors : current.product.colors,
    specifications: specifications.length > 0 ? specifications : current.product.specifications,
    features: features.length > 0 ? features : current.product.features,
    benefits: benefits.length > 0 ? benefits : current.product.benefits,
  };

  const updated: AppConfig = {
    ...current,
    product,
  };

  try {
    await saveAppConfig(updated);
    revalidatePath('/');
    revalidatePath('/product');
    revalidatePath('/admin');
    return successState;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Không thể lưu cấu hình sản phẩm.',
    };
  }
}

export async function resetConfigAction(
  _prev: ActionState | undefined,
  _formData: FormData
): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedState;
  }

  void _prev;
  void _formData;

  const clonedDefaults: AppConfig = JSON.parse(JSON.stringify(defaultAppConfig));

  try {
    await saveAppConfig(clonedDefaults);
    revalidatePath('/');
    revalidatePath('/product');
    revalidatePath('/admin');
    return successState;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Không thể khôi phục cấu hình mặc định.',
    };
  }
}

export async function changePasswordAction(
  _prev: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedState;
  }

  const currentPassword = (formData.get('currentPassword') as string | null)?.trim() ?? '';
  const newPassword = (formData.get('newPassword') as string | null)?.trim() ?? '';
  const confirmPassword = (formData.get('confirmPassword') as string | null)?.trim() ?? '';

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { status: 'error', message: 'Vui lòng nhập đầy đủ thông tin.' };
  }

  if (newPassword !== confirmPassword) {
    return { status: 'error', message: 'Mật khẩu mới và xác nhận không khớp.' };
  }

  if (newPassword.length < 6) {
    return { status: 'error', message: 'Mật khẩu mới cần tối thiểu 6 ký tự.' };
  }

  try {
    await changeAdminPassword(currentPassword, newPassword);
    await createAdminSession();
    revalidatePath('/admin');
    return { status: 'success', message: 'Đã cập nhật mật khẩu.' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Không thể cập nhật mật khẩu.',
    };
  }
}
