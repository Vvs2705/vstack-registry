"use client";

import * as React from "react";

/**
 * Máscara de moeda brasileira (acumulador de centavos).
 *
 * Trata TODOS os dígitos digitados como centavos e formata no padrão
 * brasileiro, inserindo automaticamente milhar (.) e decimal (,).
 * Sem limite de caracteres e impossível digitar formato inválido.
 *
 * Ex.: digitar "4", "2", "1", "8", "5", "0" → display "4.218,50" / value "4218.50"
 *
 * @returns `display` para exibir no campo e `value` canônico (ponto decimal)
 *          pronto para `parseFloat`/envio à API.
 */
export function maskCurrencyInput(raw: string): { display: string; value: string } {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return { display: "", value: "" };
  const amount = parseInt(digits, 10) / 100;
  return {
    value: amount.toFixed(2),
    display: new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount),
  };
}

/**
 * Formata um valor canônico (number ou string com ponto decimal) para
 * exibição "1.234,56" SEM o símbolo R$. Usado pelo CurrencyInput para
 * renderizar o valor controlado. Retorna "" quando vazio/inválido.
 */
export function formatCurrencyValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!isFinite(n)) return "";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

type CurrencyInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type" | "inputMode"
> & {
  /** Valor canônico com ponto decimal (ex.: "4218.50") ou "" quando vazio. */
  value: string;
  /** Recebe o valor canônico já normalizado, pronto para parseFloat/API. */
  onValueChange: (value: string) => void;
};

/**
 * Input de moeda brasileira com máscara automática (acumulador de centavos).
 *
 * Substitui `<input type="number">` para campos monetários: ao digitar os
 * números, insere automaticamente milhar (.) e decimal (,) — ex.: digitar
 * "421850" vira "4.218,50". Não há limite de caracteres e é impossível
 * digitar um formato inválido (apenas dígitos são aceitos).
 *
 * O `value` é sempre canônico (ponto decimal) para manter compatibilidade
 * com `parseFloat`/envio nos formulários (react-hook-form friendly).
 */
export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput({ value, onValueChange, ...props }, ref) {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        value={formatCurrencyValue(value)}
        onChange={(e) => onValueChange(maskCurrencyInput(e.target.value).value)}
      />
    );
  }
);
