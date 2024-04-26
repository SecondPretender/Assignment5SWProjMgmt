import Layout from "../components/layout";
import Image from "next/image";
import Link from 'next/link';
import Head from "next/head";

export default function Home() {
  return (
      <Layout>
          <Head>
              <title>DVD Rentals</title>
              <meta name="description" content="Rent DVDs online for your entertainment"/>
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to DVD Rentals</h1>
              <p className="text-lg mb-8">Rent your favorite movies today!</p>
              <Link href="/CanadianCustomers">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Canadian Customers!
              </button>
              </Link>
              <Link href="/AddCustomerPage">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add Customer and Rent Videos!
                  </button>
              </Link>
              <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
        />
        <Image
          src="/vercel.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
        />
          </main>

    </Layout>
  );
}


