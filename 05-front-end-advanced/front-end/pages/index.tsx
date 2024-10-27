import Head from "next/head";
import Image from "next/image";
import Header from "@components/header";
import styles from "@styles/home.module.css";

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Courses</title>
                <meta name="description" content="Courses app" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="text-center md:p-24 p-6 min-h-screen">
                <span className="flex flex-row justify-center items-center">
                    <Image
                        src="/../public/images/courses.png"
                        alt="Courses Logo"
                        className={styles.vercelLogo}
                        width={50}
                        height={50}
                    />
                    <h1 className="pl-6 text-4xl text-gray-800">Welcome!</h1>
                </span>

                <div className="pt-6">
                    <p>
                        Courses lets you see as a lecturer all the courses you
                        are teaching and as a student all the courses you are
                        enrolled in. <br />
                        You can also see when the courses are scheduled and the
                        students enrolled in each course.
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
