'use client'

import { Toast } from "@/stores/cart-store"

import { useCartStore } from "@/providers/cart-store-provider"

const createToast = (toast: Toast, index: number, removeToast: (index: any) => void) => {
    return <div className="toast">
    {toast.message}
    <div className="close-button" onClick={()=>{removeToast(index)}}>
        x
    </div>
</div>
}

export default function ToastManager() {
    const { toasts, removeToast } = useCartStore((state) => state,)
    return <div className="toast-manager">
        {
            toasts.map((toast, index) => {
                return createToast(toast, index, removeToast);
            })
        }
    </div>
}