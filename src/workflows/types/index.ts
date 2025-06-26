import { ProductDTO } from '@medusajs/framework/types';
export type GetProductStepInput = {
  id: string;
}

export type MerageMetadataStepInput = {
  metadata: Record<string, unknown> | null | undefined;
  data: any
}

export type UpdateProductMetadataWorkflowInput = {
  id: string;
  data?: any;
  locale?: string;
  locales?: string[];
  metadata?: Record<string, unknown> | null
}

export type GenerateAllMetadataLocaleStepInput = {
  product: ProductDTO;
  locales: string[] | undefined;
}

export type GenerateMetadataLocaleStepInput = {
  locale: string | undefined;
  product: ProductDTO;
}

export type UpdateProductMetadataStepInput = {
  id: string;
  metadata: Record<string, unknown>;
}