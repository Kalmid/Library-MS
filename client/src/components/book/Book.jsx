import { useEffect, useState } from "react";
import BookForm from "./BookForm"
import BookList from "./BookList"
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

function Book() {
    
    const [book, setBook] = useState([
        {id:1, title:'The Hidden Path',author:'Udari Silva', description:'A curious girl follows strange whispers coming from the woods near her home. What she discovers changes her life forever and teaches her the power of courage and curiosity.'},
        {id:2, title:'Code Beyond Limits',author:'Udari Silva', description:'When a small village faces an unknown danger, one brave teenager climbs the forbidden mountain to uncover the truth hidden at its peak.'},
        {id:3, title:'Midnight Library Secret',author:'Udari Silva', description:'Every night at midnight, a hidden door opens inside the old town library. Only one person notices — and her discovery leads to a world of forgotten stories.'},
        {id:4, title:'Dreams Under the City Lights',author:'Udari Silva', description:'A university student balances studies, ambition, and life in a busy city while chasing her dream career. A story about growth, independence, and self-discovery.'}
    ]) 

    const [editData, setEditData] = useState(null);

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

    const handleFormSubmit=(book)=> {
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
            toast.error("Error has occured!");
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