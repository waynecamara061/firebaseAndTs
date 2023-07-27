import { toast } from "react-toastify";

export const handleWarn = () => {
    toast.warn('Os campos devem ser preenchidos', { autoClose: 3000 });
};
export const handleWarnLogin = () => {
    toast.warn('Senha ou email incorretos', { autoClose: 3000 });
};

export const handleSuccess = () => {
    toast.success('Informações cadastradas', { autoClose: 3000 });
};

export const handleSuccessDelete = () => {
    toast.success('Tarefa concluida!', { autoClose: 3000 });
};