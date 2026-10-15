import { images } from "@/lib/invitation-images";
import { calendarDays, invitation, monthNames } from "@/lib/invitation-content";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function InvitationArtwork() {
  const { groom, bride, groomEnglish, brideEnglish, venueEnglish } = invitation;
  const { month, day } = invitation.date;
  return <>
    <header className="cover">
      <div className="cover-media"><img src={images.cover} alt={`${groom}과 ${bride}의 웨딩 사진`} fetchPriority="high" /></div>
      <div className="cover-text">
        <p className="eyebrow">We are getting married</p>
        <p className="cover-names" aria-hidden="true">{groomEnglish}<span>&amp;</span>{brideEnglish}</p>
        <p className="cover-meta">{invitation.date.english}<br />{venueEnglish[0]} · {venueEnglish[1]}</p>
      </div>
    </header>
    <section className="greeting" aria-label="초대의 글">
      <p className="eyebrow">Invitation</p>
      <p className="message poem">{invitation.poem}</p>
      <span className="divider" aria-hidden="true" />
      <p className="message greeting-copy">{invitation.greeting}</p>
      <div className="arch-pair" aria-hidden="true">
        <img src={images.locketBride} alt="" loading="lazy" />
        <img src={images.locketGroom} alt="" loading="lazy" />
      </div>
    </section>
    <section className="invite-card" aria-label="초대 카드">
      <figure>
        <img src={images.collage} alt="두 사람의 사진" loading="lazy" />
        <figcaption>you&rsquo;re invited<br />to our wedding</figcaption>
      </figure>
      <p className="invite-date">{monthNames[month - 1]} {day}</p>
      <p className="invite-names">{groomEnglish} &amp; {brideEnglish}</p>
    </section>
    {invitation.families.map((family, i) => <section className={`family family-${i}`} key={family.child}>
      <h2>{family.parents}<br /><strong>{family.child}</strong></h2>
      <div className="family-photo"><img src={i === 0 ? images.groomFamily : images.brideFamily} alt={`${family.parents} ${family.child} 가족 사진`} loading="lazy" /></div>
      <p className="message family-message">{family.message}</p>
    </section>)}
    {invitation.letters.map((letter, i) => <section className={`letter letter-${i}`} key={letter.to}>
      <div className="letter-photo"><img src={i === 0 ? images.letterBride : images.letterGroom} alt={i === 0 ? `밝게 웃는 신부 ${bride}` : `밝게 웃는 신랑 ${groom}`} loading="lazy" /></div>
      <p className="eyebrow letter-recipient">{letter.to}</p>
      <p className="message letter-message">{letter.message}</p>
    </section>)}
  </>;
}

export function InvitationCalendar() {
  const { year, month, day, time } = invitation.date;
  const days = calendarDays(year, month);
  return <section className="calendar" aria-labelledby="calendar-heading">
    <p className="eyebrow">Wedding day</p>
    <h2 id="calendar-heading" className="display-title">Save the Date</h2>
    <p className="calendar-date">{year}년 {month}월 {day}일 일요일 {time}</p>
    <div className="calendar-card"><table aria-label={`${year}년 ${month}월 결혼식 달력`}><thead><tr>{weekdays.map(d => <th key={d} scope="col">{d}</th>)}</tr></thead><tbody>{Array.from({ length: Math.ceil(days.length / 7) }, (_, row) => <tr key={row}>{Array.from({ length: 7 }, (_, col) => { const date = days[row * 7 + col]; return <td key={col}>{date && <span className={date === day ? "wedding-day" : ""} aria-label={date === day ? `${month}월 ${day}일 결혼식` : undefined}>{date}</span>}</td>; })}</tr>)}</tbody></table></div>
  </section>;
}
