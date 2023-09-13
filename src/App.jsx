import { useState, useMemo, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/auth"; // JSX component
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieState, setMovieState] = useState({
    title: "",
    releaseDate: 0,
    receivedAnOscar: false,
  });
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const collectionRef = collection(db, "movies");
  console.log({ movieState });

  const onSubmitMovie = async () => {
    await addDoc(collectionRef, {
      ...movieState,
      userId: auth?.currentUser?.uid,
    });
    getMovieList();
  };

  const deleteMovie = async (id) => {
    const singleDoc = doc(db, "movies", id);
    await deleteDoc(singleDoc);
    getMovieList();
  };

  const getMovieList = async () => {
    try {
      const data = await getDocs(collectionRef);
      const filteredData = data?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      console.log({ filteredData });
      setMovieList(filteredData);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleUpdateTitle = async (id) => {
    const singleDoc = doc(db, "movies", id);
    await updateDoc(singleDoc, { title: updatedTitle });
    getMovieList();
  };

  const handleUpload = () => {
    if (!imageFile) return;
    const uploadRef = ref(storage, `uploadFile/${imageFile.name}`);
    uploadBytes(uploadRef, imageFile);
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload File</button>
      </div>
      <Auth />
      <div style={{ display: "flex" }}>
        <div>
          {movieList?.map(({ title, id, releaseDate, receivedAnOscar }) => (
            <div key={id}>
              <h2 style={{ color: receivedAnOscar ? "green" : "red" }}>
                {title}
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  checked={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTitle(id)}>
                  {" "}
                  Update Title
                </button>
              </div>
              <p>{releaseDate}</p>
              <button onClick={() => deleteMovie(id)}>Delete</button>
            </div>
          ))}
        </div>
        {/* add movie details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            margin: "20px",
          }}
        >
          <input
            placeholder="movie title..."
            type="text"
            value={movieState?.title}
            onChange={(e) =>
              setMovieState({ ...movieState, title: e.target.value })
            }
          />
          <input
            placeholder="release date..."
            type="number"
            value={movieState?.releaseDate}
            onChange={(e) =>
              setMovieState({
                ...movieState,
                releaseDate: Number(e.target.value),
              })
            }
          />
          <input
            type="checkbox"
            checked={movieState?.receivedAnOscar}
            onChange={(e) =>
              setMovieState({
                ...movieState,
                receivedAnOscar: e.target.checked,
              })
            }
          />
          <button onClick={() => onSubmitMovie()}> submit movie</button>
        </div>
      </div>
    </>
  );
}

export default App;
