import pageNotFound from '../../assets/page-not-found.svg';

const ErrorPage = () => {
    return ( 
        <>
        <div className="flex flex-col gap-20 justify-center items-center w-[100%] h-screen">
            <img className='w-[50%]' src={pageNotFound} />
            <p className="text-3xl font-bold"><span className="text-red-600">Ops!</span> Wrong Page</p>
        </div>
        </>
     );
}
 
export default ErrorPage;