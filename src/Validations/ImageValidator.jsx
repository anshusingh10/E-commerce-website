import React from 'react'

export default function ImageValidator(e) {
    let { files } = e.target
    if (files.length === 0) {
        return "Pic Field is Mendatory"
    }
    else if (files.length === 1) {
        let pic = files[0]
        if (!(pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg" || pic.type === "image/gif")) {
            return " Invalid Pic,Please upload an Image(.jpeg, .png, .jpg, .gif)";
        } else if (pic.size > 1048576) {
            return "Pic size should be less than 1 MB";
        } else {
            return "";
        }
    }
    else {
        let pics = Array.from(files)
        let errorMessage = []
        pics.forEach((pic, index) => {
            if (!(pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg" || pic.type === "image/gif")) {
                errorMessage.push(` Invalid Pic${index + 1},Please upload an Image(.jpeg, .png, .jpg, .gif)`)
            } else if (pic.size > 1048576) {
                errorMessage.push(`Pic Size ${index + 1}is too High,Please upload an image upto 1 mb`)
            }
        })
        return errorMessage.length === 0 ? "" : errorMessage.join("|")
    }

}

