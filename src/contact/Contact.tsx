import phoneIcon from "./images/phone-icon.png";
import mailIcon from "./images/mail-icon.png";
import type ContactInfo from "./ContactInfo";

// Object destructuring
export default function Contact({
  img,
  imgAlt,
  name,
  phoneNumber,
  email,
}: ContactInfo) {
  return (
    //这是 不对的，因为 key 只能用在 父组件 map 渲染列表的元素上，而不是子组件内部。
    // <article className="contact-card" key={id}>
    <article className="contact-card">
      <img src={img} alt={imgAlt} />
      <h3>{name}</h3>
      <div className="info-group">
        <img src={phoneIcon} alt="phone icon" />
        <p>{phoneNumber}</p>
      </div>
      <div className="info-group">
        <img src={mailIcon} alt="mail icon" />
        <p>{email}</p>
      </div>
    </article>
  );
}
