import Swal from "sweetalert2";

function ErrorMessage({ errorMessage }) {
  console.error("Error message:", errorMessage);
  Swal.fire({
    icon: "error",
    title: "Error",
    text: errorMessage,
  });

  return null;
}

export default ErrorMessage;
