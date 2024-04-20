import path from 'path';
import fs from 'fs';
import Link from  'next/link';

export default function HomePage(props){
    const { products } = props;
    return (
        <>
        <p>Loaded data from local file:</p>
        <ul>
            {products.map(product => 
                <li key={product.id}>
                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                </li>
                )}
        </ul>
        <p>Loaded data from firebase:</p>
        <Link href="/last-sales-useEffect/">/last-sales-useEffect</Link>
        <br/>
        <Link href="/last-sales-useSWR/">/last-sales-useSWR</Link>
        <p>Loaded data from firebase: client-side useSWR and server-side prerendering</p>
        <Link href="/last-sales-useSWR-prerendering/">/useSWR and getStaticProps</Link>
        </>
    )
}

export async function getStaticProps(){
    console.log("re-generating..");
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); //current working directory
    const jsonData = await fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);

    if(!data){
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if(data.products.length === 0){
        return {
            notFound: true
        }
    }

    return {
        props: {
            // products: [{id: 'p1', title: "Product 1"}]
            products: data.products
        },
        revalidate: 10,
    }
}