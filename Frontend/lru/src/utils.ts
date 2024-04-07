import Swal from "sweetalert2";
export const commanHeaders = () => {
  const commanHeader = {
    auth: { username: "lru@sonu", password: "12345" },
    header: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return commanHeader;
};

export const SuccessSwal = (title: string) => {
  Swal.fire({
    title: title,
    icon: "success",
  });
};

export const ErrorSwal = (title: string) => {
  Swal.fire({
    title: title,
    icon: "error",
  });
};
