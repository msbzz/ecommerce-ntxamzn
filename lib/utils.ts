import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// 1. Função cn
// A função cn combina classes CSS utilizando duas bibliotecas, clsx e tailwind-merge.

// Componentes:
// clsx: Uma biblioteca para condicionalmente construir strings de classes. Ela aceita argumentos como:
// Strings ("classe1 classe2")
// Arrays (["classe1", condition && "classe2"])
// Objetos ({ "classe1": true, "classe2": false })
// tailwind-merge: Resolve conflitos em classes Tailwind (exemplo: se você passar bg-red-500 e bg-blue-500, ela manterá a última ou mais relevante).

// ------- Example ----------
// cn("text-lg", { "font-bold": true }, "bg-red-500")
// Saída: "text-lg font-bold bg-red-500"

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

// ------- Example ----------
// formatNumberWithDecimal(123.4) // Saída: "123.40"
// formatNumberWithDecimal(123)   // Saída: "123"

// PROMPT: [ChatGTP] create toSlug ts arrow function that convert text to lowercase, remove non-word, non-whitespace, non-hyphen characters, replace whitespace, trim leading hyphens and trim trailing hyphens

export const toSlug = (text: string): string =>
  text
    .toLowerCase() // Converte para minúsculas
    .replace(/[^\w\s-]+/g, '') // Remove caracteres não alfanuméricos, exceto espaços e hífens
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/^-+|-+$/g, '') // Remove hífens no início e no final
    .replace(/-+/g, '-')
    
    
    // ------- Example ----------
    // toSlug("   Hello, World! ") // Saída: "hello-world"
    // toSlug("My-Special_Title!") // Saída: "my-special-title"

    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
    })
    export function formatCurrency(amount: number) {
      return CURRENCY_FORMATTER.format(amount)
    }
    
    const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')
    export function formatNumber(number: number) {
      return NUMBER_FORMATTER.format(number)
    }

    export const round2 = (num: number) =>
      Math.round((num + Number.EPSILON) * 100) / 100
    
    export const generateId = () =>
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('')