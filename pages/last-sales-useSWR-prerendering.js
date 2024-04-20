import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props){
    const [sales, setSales] = useState(props.sales);

    // const { data, error } = useSWR("https://nextjs-prerendering-3f8c0-default-rtdb.firebaseio.com/sales.json");
    
    const { data, error } = useSWR("https://nextjs-prerendering-3f8c0-default-rtdb.firebaseio.com/sales.json", (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if(data){
            const transformedSales = [];

            for (const key in data){
                transformedSales.push({
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);

        }
    }, [data]);

  

    if(error){
        return <p>Failed to load.</p>
    }

    if(!data && !sales){
        return <p>Loading...</p>
    } 


    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    )
}

export async function getStaticProps(contex){
    const response = await fetch('https://nextjs-prerendering-3f8c0-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json();
    const transformedSales = [];

    for (const key in data){
        transformedSales.push({
            id: key, 
            username: data[key].username, 
            volume: data[key].volume,
        });
    }

    return {props: { sales: transformedSales}};
    
}