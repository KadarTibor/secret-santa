'use client'
import signIn from "@/firebase/auth/signin";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";

function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result);
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

export default Page;