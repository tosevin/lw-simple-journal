import {useForm} from "react-hook-form";
export default function Login() {
    const { register, setError, handleSubmit,  formState:{ errors } } = useForm();

    const onSubmit = async data =>{
        const password = {
            password: data.password,
        };
        try {
                const response = await fetch("http://localhost:5505/api/login/", {
                    method: "POST",
                    body: JSON.stringify(password),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });


                const token = await response.json();
                // console.log("response", token.token);
                localStorage.setItem('userToken', token.token);
                
                if (!response.ok) {
                    setError('password', { type: 'manual', message: '密码错误' });
                    alert("密码错误");
                }
                else {
                    window.location.href = "/";
                }
            }catch(err){
                console.log(err);
            }
    }
    return (
        <>
            <form 
            onSubmit={handleSubmit(onSubmit)} 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', width: '50%' }}
            >
                <p>请输入密码</p>
                <input
                    type="password"                   
                    {...register("password", {required : '必填' })} 
                    style={{ width: '60%',margin: ' auto'}}
                />
                <p>{errors.password?.message}</p>
                <button 
                type="submit"
                style={{ width: '20%',marginRight: '5rem'}}
                >提交
                </button>
            </form>
        </>
    )
}