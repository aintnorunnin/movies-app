import React, { useCallback, useEffect, useState } from "react";

const AddMovieForm: React.FC = () => {
    function submitHandler(event: React.FormEvent) {
        event.preventDefault();
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text"></input>

            <label htmlFor="opening_text">Opening Text</label>
            <input id="opening_text" type="text"></input>

            <label htmlFor="release_date">Release Date</label>
            <input id="release_date" type="text"></input>
            <button type="submit">Add Movie</button>
        </form>
    )
}

export default AddMovieForm;