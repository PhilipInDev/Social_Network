import './NetworkContact.scss'

const NetworkContact = (props) => {
    if(!props.link){
        return null;
    }
    let link = props.link.startsWith('https://') || props.link.startsWith('http://') ? props.link : `https://${props.link}`;
    let icon;
    let mod = `--${props.type}`;
    if(props.link){
        switch (props.type) {
            case "facebook":
                icon = <i className="fab fa-facebook"></i>;
                break;
            case "website":
                icon = <i className="fas fa-project-diagram"></i>;
                break;
            case "vk":
                icon = <i className="fab fa-vk"></i>;
                break;
            case "twitter":
                icon = <i className="fab fa-twitter"></i>;
                break;
            case "instagram":
                icon = <i className="fab fa-instagram"></i>;
                break;
            case "youtube":
                icon = <i className="fab fa-youtube"></i>;
                break;
            case "github":
                icon = <i className="fab fa-github"></i>;
                break;
            case "mainLink":
                icon = <i className="fas fa-home"></i>;
                break;
            default:
                break;
        }
    }
    return(
        <a href={link} className={`network-contact network-contact${mod}`} target="_blank">
            {icon}
        </a>
    )
}

export default NetworkContact;