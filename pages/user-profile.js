export default function UserProfilePage(props){
    return (
        <h1>{props.username}</h1>
    )
}

export async function getServerSideProps(contex){
    const { params, req, res } = contex; //request, response

    console.log('Server side code');

    return {
        props: {
            username: "Max"
        }       
    }
}