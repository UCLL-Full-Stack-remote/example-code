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
                <section className="d-flex flex-column justify-content-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
