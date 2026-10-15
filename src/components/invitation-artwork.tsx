import type { CSSProperties } from "react";
import { images } from "@/lib/invitation-images";
import { calendarDays, invitation, weekdays } from "@/lib/invitation-content";

const lines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));

// Letters placed on a hand-tuned scatter so they read like stickers dropped on the photo.
const scatter = [
  [0, 0],
  [28, 18],
  [54, 40],
  [8, 58],
  [36, 78],
  [64, 98],
  [26, 118],
] as const;
export function LetterDots({
  text,
  tone = "pink",
  className = "",
}: {
  text: string;
  tone?: "pink" | "blue";
  className?: string;
}) {
  return (
    <div className={`letter-dots letter-dots-${tone} ${className}`} aria-hidden="true">
      {[...text].map((char, i) => {
        const [x, y] = scatter[i % scatter.length]!;
        return (
          <span key={i} style={{ "--x": `${x}px`, "--y": `${y}px` } as CSSProperties}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export function Heart({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return <span className={`heart ${className}`} style={style} aria-hidden="true" />;
}

export function Cover() {
  const { groom, groomEnglish, brideEnglish, date, venueEnglish } = invitation;
  return (
    <section className="cover" aria-label="표지">
      <img
        className="cover-photo"
        src={images.cover}
        alt={`${groom}과 ${invitation.bride}의 웨딩 사진`}
      />
      <LetterDots text={invitation.brideLetters} className="cover-bride-letters" />
      <LetterDots text={invitation.groomLetters} className="cover-groom-letters" />
      <div className="cover-heart">
        <p className="cover-names">
          {groomEnglish} <span aria-hidden="true">✳</span> {brideEnglish}
        </p>
        <p className="cover-info">
          {date.english}
          <br />
          {venueEnglish.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className="cover-footer">
        <p className="script-sticker">
          You’re invited
          <br />
          to our wedding
        </p>
      </div>
    </section>
  );
}

export function Message() {
  const { date, venueEnglish, poem, greeting, groomEnglish, brideEnglish } = invitation;
  return (
    <section className="message" aria-label="초대의 말">
      <p className="handwriting message-poem">{lines(poem)}</p>
      <p className="handwriting message-greeting">{lines(greeting)}</p>
      <div className="locket">
        <img src={images.locket[0]} alt="" />
        <img src={images.locket[1]} alt="" />
      </div>
      <Heart className="m-heart-a" />
      <Heart className="m-heart-b" />
      <Heart className="m-heart-c" />
      <div className="date-tag">
        <p className="date-tag-date">{date.english}</p>
        <Heart className="date-tag-heart" />
        <p className="date-tag-venue">{venueEnglish.join(" ")}</p>
      </div>
      <div className="polaroid">
        <img src={images.polaroid} alt="" />
        <p className="script-note">
          you’re invited
          <br />
          to our wedding
        </p>
      </div>
      <p className="stamp" aria-hidden="true">
        <span>{groomEnglish}</span>
        <span>MARCH {date.day}</span>
        <span>{brideEnglish}</span>
      </p>
    </section>
  );
}

export function Families() {
  const photos = [images.groomFamily, images.brideFamily];
  return (
    <>
      {invitation.families.map((family, i) => (
        <section className="family" key={family.child} aria-label={family.child}>
          <p className="family-title">
            {family.parents}
            <br />
            <strong>{family.child}</strong>
          </p>
          <div className="family-photos">
            <img
              className="family-main"
              src={photos[i]}
              alt={`${family.child} 가족 사진`}
              loading="lazy"
            />
            <img className="cutout cutout-a" src={images.cutouts[i]![0]} alt="" loading="lazy" />
            <img className="cutout cutout-b" src={images.cutouts[i]![1]} alt="" loading="lazy" />
            <Heart className="f-heart-a" />
            <Heart className="f-heart-b" />
          </div>
          <p className="handwriting family-message">{lines(family.message)}</p>
        </section>
      ))}
    </>
  );
}

export function Letters() {
  const photos = [images.letterBride, images.letterGroom];
  const tones = ["blue", "pink"] as const;
  return (
    <>
      {invitation.letters.map((letter, i) => (
        <section
          className={`letter letter-${i === 0 ? "left" : "right"}`}
          key={letter.to}
          aria-label={letter.to}
        >
          <div className="letter-photo">
            <img src={photos[i]} alt="" loading="lazy" />
            <LetterDots
              text={letter.to.replace(/^TO\.\s*/, "TO. ").replace(/\s/g, "")}
              tone={tones[i]!}
            />
          </div>
          <p className="handwriting letter-message">{lines(letter.message)}</p>
        </section>
      ))}
    </>
  );
}

export function SaveTheDate() {
  const { date } = invitation;
  const days = calendarDays(date.year, date.month);
  return (
    <section className="save-date" aria-label="Save the Date">
      <h2 className="script-sticker script-sticker-blue">Save the Date</h2>
      <p className="save-date-text">
        {date.year}년 {date.month}월 {date.day}일 일요일 {date.time}
      </p>
      <div className="calendar">
        <div className="calendar-grid" role="table" aria-label={`${date.year}년 ${date.month}월`}>
          {weekdays.map((day) => (
            <span className="calendar-weekday" key={day} role="columnheader">
              {day}
            </span>
          ))}
          {days.map((day, i) =>
            day === null ? (
              <span key={i} />
            ) : (
              <span
                className={`calendar-day${day === date.day ? " is-wedding" : ""}`}
                key={i}
                role="cell"
              >
                {day}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
