import { useEffect, useState } from "react";
import BookForm from "./BookForm"
import BookList from "./BookList"
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import axios from "axios";

function Book() {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL;
    
    const [book, setBook] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        try {
            const LoadBook = async() => {
                var bookData = (await axios.get(BASE_URL)).data;
                setBook(bookData);
            }
            LoadBook();

        } catch (error) {
            console.log(error);
            toast.error("Error has occured!");
        }        
        finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        methods.reset(editData);
    }, [editData])

    const defaultFormValues = {
        id: 0,
        title: '',
        author:'',
        description:''
    }
    const methods = useForm({
        defaultValues: defaultFormValues
    });

    const handleFormSubmit= async (book)=> {
        setLoading(true);
        try {
            if(book.id <= 0){
                console.log("add");
                setBook((previousBook) => [...previousBook, book]);
            } else {
                console.log("edit");
                setBook((previousBook)=> previousBook.map(p=>p.id===book.id?book:p));
            }
            methods.reset(defaultFormValues);
            toast.success("Saved Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error has occured!");
        }
        finally{

        }
    }

    const handdleFormReset = () => {
        methods.reset(defaultFormValues);
    }

    const handleBookEdit = (book) => {
        setEditData(book);
    }

    const handleBookDelete = (book) => {
        if(!confirm(`Are you sure to delete a book : ${book.title} ${book.author} ${book.description}`)) return;

        try {
            
            setBook((previousBook) => previousBook.filter(p => p.id !== book.id));
            toast.success("Deleted Successfully!");
        } catch (error) {
            toast.error("Error on Deleting!");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Book Management
                    </h1>

                </div>

                <BookForm methods={methods} onFormSubmit={handleFormSubmit} onFormReset={handdleFormReset}/>
                <BookList bookList={book} onBookEdit={handleBookEdit} onBookDelete={handleBookDelete}/>
            </div>
        </div>
    )
}

export default Book