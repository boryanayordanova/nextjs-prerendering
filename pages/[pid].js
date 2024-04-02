import path from 'path';
import fs from 'fs';
import { Fragment } from "react";

export default function ProductDetailPage(props){
    const { loadedProduct } = props

    return <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
}

export async function getStaticProps(context){
    const { params } = context;

    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); //current working directory
    const jsonData = await fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths(){
    return {
        paths: [
            {params: {pid: 'p1'}},
            {params: {pid: 'p2'}},
            {params: {pid: 'p3'}},
        ],
        fallback: false
    }
}