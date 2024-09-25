import toast from "react-hot-toast";

export default function customToast(success: boolean, message: string) {
  const successNotify = () =>
    toast.success(message, {
      style: {
        fontSize: "2rem",
        lineHeight: "2.1rem",
        color: "#191919",
        marginTop: 20,
      },
    });
  const errorNotify = () =>
    toast.error(message, {
      style: {
        fontSize: "2rem",
        lineHeight: "2.1rem",
        color: "#191919",
        marginTop: 20,
      },
    });

  return success ? successNotify() : errorNotify();
}
