import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(){
    const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR("https://nextjs-prerendering-3f8c0-default-rtdb.firebaseio.com/sales.json");

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

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-prerendering-3f8c0-default-rtdb.firebaseio.com/sales.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         const transformedSales = [];

    //         for (const key in data){
    //             transformedSales.push({
    //                 id: key, 
    //                 username: data[key].username, 
    //                 volume: data[key].volume,
    //             });
    //         }
    //         setSales(transformedSales);
    //         setIsLoading(false);
    //     });
    // }, []);


    // if(isLoading){
    //     return <p>Loading...</p>
    // }

    // if(!sales){
    //     return <p>No data yet</p>;
    // }

    if(error){
        return <p>Failed to load.</p>
    }

    // if(!data || !sales){
    //     return <p>Loading...</p>
    // } 

    if(!data){
        return <p>Loading data...</p>
    } 

    if(!sales){
        return <p>Loading transformed data...</p>
    } 

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    )
}