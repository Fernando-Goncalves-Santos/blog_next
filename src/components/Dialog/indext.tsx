"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import Button from "../Button";

type DialogProps = {
  title: string;
  content: ReactNode;
  isVisible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export default function Dialog({
  title,
  content,
  onCancel,
  onConfirm,
  isVisible = false,
  disabled = false,
}: DialogProps) {


  // Essa função permite que eu clique em OK e depois em qualquer outro canto da tela
  // Sem chamar a função OnCancel
  function handleCancel() {
    if (disabled) return
    onCancel();
  }


  if (!isVisible) return null;
  return (
    <div
      className={clsx(
        "fixed z-50",
        "inset-0",
        "bg-black/50",
        "backdrop-blur-xs",
        "flex items-center justify-center",
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          "bg-slate-100",
          "p-6",
          "rounded-lg",
          "min-w-96",
          "max-w-2xl",
          "mx-6",
          "flex flex-col gap-6",
          "shadow-lg shadow-black/30",
          "text-center"
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        // Como adicionamos o evento de OnCancel na div PAI (funddo preto)
        // Precisamos cancelar a propagação desse OnClick na div filha, se não, todos os clicks seriam OnCancel
        onClick={e => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">{title}</h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
           variant="ghost"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button
          variant="default"
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
