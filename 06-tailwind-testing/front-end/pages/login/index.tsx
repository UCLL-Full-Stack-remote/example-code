import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
