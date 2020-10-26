import React, {FC} from "react";
import preloader from "../../../assets/images/loader.svg";


let Preloader:FC = (props) => {
    return <div><img src={preloader} /> </div>
}
export default Preloader;

