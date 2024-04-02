import path from 'path';
import fs from 'fs';
import Link from  'next/link';

export default function HomePage(props){
    const { products } = props;
    return (
        <ul>
            {products.map(product => 
                <li key={product.id}>
                    <Link href={`/${product.id}`}>{product.title}</Link>
                </li>
                )}
        </ul>
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