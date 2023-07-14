import { ReactElement } from "react";
import { toast } from "react-hot-toast";

export const toastOptions = (type: "success" | "error", message: string, icon: ReactElement) => {
	switch (type) {
		case "success":
			return toast.success(message, {
				icon: icon,
				style: {
					color: "#3AD29F",
				},
				duration: 5000,
			});
		case "error":
			return toast.error(message, {
				icon: icon,
				style: {
					color: "#F11A16",
				},
				duration: 5000,
			});
	}
};
