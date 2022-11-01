import { object, string, number, InferType } from 'yup';

export const LinkByIdSchema = object({
  linkId: string().required(),
});

export type LinkByIdDTO = InferType<typeof LinkByIdSchema>;

export const LinksByTenantSchema = object({
  tenantId: string().required(),
  page: number().optional().nullable(true),
  size: number().optional().nullable(true),
});

export type LinksByTenantDTO = InferType<typeof LinksByTenantSchema>;

export const SaveLinkSchema = object({
  id: string().optional(),
  tenantId: string().required('TenantId obrigatório'),
  internalName: string().required('Nome interno obrigatório'),
  publicName: string().required('Nome público obrigatório'),
  slug: string().required('Slug obrigatório'),
  destination: string().required('Destino obrigatório'),
  internalLink: string().optional(),
});

export type SaveLinkDTO = InferType<typeof SaveLinkSchema>;

export const DeleteLinkSchema = object({
  linkId: string().required(),
});

export type DeleteLinkDTO = InferType<typeof DeleteLinkSchema>;


