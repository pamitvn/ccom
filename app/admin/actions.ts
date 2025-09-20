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
  const updatedStore: StoreConfig = {
    name: (formData.get('name') as string | null)?.trim() || current.store.name,
    tagline: (formData.get('tagline') as string | null)?.trim() || '',
    contact: {
      hotline: (formData.get('hotline') as string | null)?.trim() || '',
      email: (formData.get('email') as string | null)?.trim() || '',
      address: (formData.get('address') as string | null)?.trim() || '',
    },
    productLinks: parseLinks(formData.get('productLinks') as string | null) ?? current.store.productLinks,
    supportLinks: parseLinks(formData.get('supportLinks') as string | null) ?? current.store.supportLinks,
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
  const colors = parseColors(formData.get('colors') as string | null) ?? current.product.colors;
  const specifications = parseSpecifications(formData.get('specifications') as string | null) ?? current.product.specifications;
  const features = parseFeatures(formData.get('features') as string | null) ?? current.product.features;
  const benefits = parseLines(formData.get('benefits') as string | null) ?? current.product.benefits;

  const product: ProductConfig = {
    colors,
    specifications,
    features,
    benefits,
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

function parseLinks(input: string | null): StoreConfig['productLinks'] | undefined {
  if (!input) {
    return undefined;
  }
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const links = lines.map((line) => {
    const [label = '', href = ''] = line.split('|').map((part) => part.trim());
    return { label, href };
  });

  return links.length > 0 ? links : undefined;
}

function parseColors(input: string | null): ProductColorOption[] | undefined {
  if (!input) {
    return undefined;
  }

  const colors = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id = '', name = '', swatchClasses = '', image = ''] = line.split('|').map((part) => part.trim());
      return { id, name, swatchClasses, image } as ProductColorOption;
    })
    .filter((color) => color.id && color.name && color.image);

  return colors.length > 0 ? colors : undefined;
}

function parseSpecifications(input: string | null): ProductSpecification[] | undefined {
  if (!input) {
    return undefined;
  }

  const specs = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [icon = '', label = '', value = ''] = line.split('|').map((part) => part.trim());
      return { icon: icon as ProductSpecification['icon'], label, value };
    })
    .filter((spec) => spec.icon && spec.label && spec.value);

  return specs.length > 0 ? specs : undefined;
}

function parseFeatures(input: string | null): ProductFeature[] | undefined {
  if (!input) {
    return undefined;
  }

  const features = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [icon = '', title = '', description = ''] = line.split('|').map((part) => part.trim());
      return { icon, title, description };
    })
    .filter((feature) => feature.title && feature.description);

  return features.length > 0 ? features : undefined;
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

function parseLines(input: string | null): string[] | undefined {
  if (!input) {
    return undefined;
  }

  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : undefined;
}
