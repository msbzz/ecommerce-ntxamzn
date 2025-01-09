import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

// Common
const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      `${field} must have exactly two decimal places (e.g., 49.99)`
    )
export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  isPublished: z.boolean(),
  price: Price('Price'),
  listPrice: Price('List price'),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative('count in stock must be a non-negative number'),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, 'Average rating must be at least 0')
    .max(5, 'Average rating must be at most 5'),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative('Number of reviews must be a non-negative number'),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5),
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative('Number of sales must be a non-negative number'),
})


// O código fornecido utiliza a biblioteca Zod para validação e criação de esquemas de dados no 
// TypeScript/JavaScript. A seguir, uma explicação detalhada sobre os componentes da função e do esquema definido:


// 1. Função Price
// - Definição: const Price = (field: string) => { ... }
//   - A função Price é um validador customizado criado para campos que representam preços.
//   - Ela aceita um argumento field (nome do campo) para personalizar as mensagens de erro.
// - Lógica de validação:
//   - Usa o método z.coerce.number() para converter qualquer entrada em número antes da validação.
//   - Aplica a função .refine() para verificar se o valor é válido.
//    - Regex: ^\d+(\.\d{2})?$
//     - Verifica se o número possui exatamente duas casas decimais (e.g., 49.99).
//    - Utilitário formatNumberWithDecimal:
//     - É usado para formatar o número antes de validar.
//     - Supõe-se que esta função está no arquivo ./utils e converte o número para um formato com casas decimais.
// - Mensagem de erro:
//  - Se o número não estiver no formato correto, retorna uma mensagem personalizada com o nome do campo (field).

// 2. Esquema ProductInputSchema
// Esse é o esquema principal que valida os dados de entrada para produtos. Abaixo estão os campos e suas regras de validação:

// - name:
//   - Tipo: String.
//   - Deve ter no mínimo 3 caracteres.
//   - Mensagem de erro: "Name must be at least 3 characters".

// - slug:
//   - Tipo: String.
//   - Deve ter no mínimo 3 caracteres.
//   - Mensagem de erro: "Slug must be at least 3 characters".

// - category:
//   - Tipo: String.
//   - É obrigatório.
//   - Mensagem de erro: "Category is required".

// - images:
//   - Tipo: Array de strings.
//   - Deve conter pelo menos 1 item.
//   - Mensagem de erro: "Product must have at least one image".

// - brand:
//   - Tipo: String.
//   - É obrigatório.
//   - Mensagem de erro: "Brand is required".

// - description:
//   - Tipo: String.
//   - É obrigatório.
//   - Mensagem de erro: "Description is required".

// - isPublished:
//   - Tipo: Boolean.
//   - Indica se o produto está publicado.

// - price e listPrice:
//   - Ambos utilizam a função Price para validação.
//   - Mensagem de erro: "Price must have exactly two decimal places" ou "List price must have exactly two decimal places".

// - countInStock:
//   - Tipo: Número inteiro não negativo.
//   - Mensagem de erro: "Count in stock must be a non-negative number".

// - tags:
//   - Tipo: Array de strings.
//   - Valor padrão: array vazio [].

// - sizes:
//   - Tipo: Array de strings.
//   - Valor padrão: array vazio [].

// - colors:
//   - Tipo: Array de strings.
//   - Valor padrão: array vazio [].

// - avgRating:
//   - Tipo: Número.
//   - Deve estar entre 0 e 5 (inclusive).
//   - Mensagens de erro:
//      - "Average rating must be at least 0".
//      - "Average rating must be at most 5".

// - numReviews:
//   - Tipo: Número inteiro não negativo.
//   - Mensagem de erro: "Number of reviews must be a non-negative number".

// - ratingDistribution:
//   - Tipo: Array de objetos.
//   - Cada objeto deve conter:
//     - rating: Número.
//     - count: Número.
//   - Máximo de 5 objetos no array.

// - reviews:
//   - Tipo: Array de strings.
//   - Valor padrão: array vazio [].

// - numSales:
//   - Tipo: Número inteiro não negativo.
//   - Mensagem de erro: "Number of sales must be a non-negative number".