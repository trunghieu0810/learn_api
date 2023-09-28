import Layout from "../../component/Layout"
import {getBooks} from '../../lib/book'

const Books = ({books}) => {
    return (
        <Layout>
            {books.map((book, index) => {
                return (
                    <div>
                        <div>Sách thứ: {index++}</div>
                        <div>Name: {book.bookName}</div>
                        <div>Content: {book.bookContent}</div>
                    </div>
                )
            })}
        </Layout>
    )
}


export const getStaticProps = async () => {
    const books = await getBooks();
    console.log(books)
    return {
        props: {
            books,
        }
    }
}

export default Books