import { images } from "@/lib/invitation-images";
import { calendarDays, invitation, monthNames } from "@/lib/invitation-content";

function LetterDots({ text, className = "" }: { text: string; className?: string }) {
  return <div className={`letter-dots ${className}`} aria-label={text}>{Array.from(text.replaceAll(" ", "")).map((letter, i) => <span key={i} aria-hidden="true">{letter}</span>)}</div>;
}

export function InvitationArtwork() {
  return <>
    <header className="editable-cover">
      <img className="cover-photo" src={images.cover} alt={`${invitation.groom}과 ${invitation.bride}의 웨딩 사진`} fetchPriority="high" />
      <LetterDots text={invitation.brideEnglish.toUpperCase()} className="cover-bride" /><LetterDots text={invitation.groomEnglish.toUpperCase()} className="cover-groom" />
      <div className="cover-heart"><h1>{invitation.englishNames}</h1><p>{invitation.date.english}<br />{invitation.venueEnglish[0]}<br />{invitation.venueEnglish[1]}</p></div>
      <h2 className="script-title cover-title">You're invited<br /><span>to our wedding</span></h2>
    </header>
    <section className="editable-greeting" aria-label="초대의 글">
      <p className="handwritten poem">{invitation.poem}</p><p className="handwritten greeting-copy">{invitation.greeting}</p>
      <div className="locket-pair" aria-hidden="true"><div className="locket"><img src={images.locketBride} alt="" /></div><div className="locket"><img src={images.locketGroom} alt="" /></div></div>
      <div className="wedding-collage"><div className="collage-stamp"><img src={images.collage} alt="서로에게 입맞추는 두 사람" loading="lazy" /><p className="handwritten">you're invited<br />to our wedding</p></div><div className="date-envelope"><p>{invitation.date.english}</p><span className="paper-heart" /><p>{invitation.venueEnglish[0]}<br />{invitation.venueEnglish[1]}</p></div><div className="round-seal">{invitation.groomEnglish}<br /><span>{monthNames[invitation.date.month - 1]} {invitation.date.day}</span><br />{invitation.brideEnglish}</div><span className="paper-heart collage-heart" /></div>
    </section>
    {invitation.families.map((family, i) => <section className={`editable-family family-${i}`} key={family.child}>
      <h2>{family.parents}<br /><strong>{family.child}</strong></h2>
      <div className="family-photo-wrap"><img src={i === 0 ? images.groomFamily : images.brideFamily} alt={family.parents + " " + family.child + " 가족 사진"} loading="lazy" /><span className="paper-heart family-heart-one" /><span className="paper-heart family-heart-two" /></div>
      <p className="handwritten family-message">{family.message}</p>
    </section>)}
    {invitation.letters.map((letter, i) => <section className={`editable-letter letter-${i}`} key={letter.to}>
      <div className="letter-photo-wrap"><img src={i === 0 ? images.letterBride : images.letterGroom} alt={i === 0 ? `밝게 웃는 신부 ${invitation.bride}` : `밝게 웃는 신랑 ${invitation.groom}`} loading="lazy" /><LetterDots text={letter.to} className="letter-recipient" /></div>
      <p className="handwritten letter-message">{letter.message}</p>
    </section>)}
  </>;
}

export function InvitationCalendar() {
  const { year, month, day, time } = invitation.date;
  return <section className="editable-calendar" aria-labelledby="calendar-heading">
    <h2 id="calendar-heading" className="script-title">Save the Date</h2>
    <p className="calendar-date">{year}년 {month}월 {day}일 일요일 {time}</p>
    <div className="calendar-paper"><table aria-label={`${year}년 ${month}월 결혼식 달력`}><thead><tr>{["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => <th key={d} scope="col">{d}</th>)}</tr></thead><tbody>{Array.from({ length: Math.ceil(calendarDays(year, month).length / 7) }, (_, row) => <tr key={row}>{Array.from({ length: 7 }, (_, col) => { const date = calendarDays(year, month)[row * 7 + col]; return <td key={col}>{date && <span className={date === day ? "wedding-day" : ""} aria-label={date === day ? `${month}월 ${day}일 결혼식` : undefined}>{date}</span>}</td>; })}</tr>)}</tbody></table></div>
  </section>;
}