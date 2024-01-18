'use client'
import { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, Input } from "@nextui-org/react";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/admin")
    }

    return (
        <div className="flex justify-center  content-center w-screen h-screen">
            <Card className="w-80 h-64 mt-72">
                <CardBody>
                    <form onSubmit={handleForm} className="flex flex-col justify-items-center px-4 py-4" >
                        <Input className="my-2" type="email" onValueChange={setEmail} variant="bordered" label="Email"/>
                        <Input className="my-2" type="password" onValueChange={setPassword} variant="bordered" label="Password"/>
                        <Button className="w-24 my-2" type="submit">Sign up</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default LoginPage;