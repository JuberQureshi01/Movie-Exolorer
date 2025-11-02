import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate, useParams } from "react-router-dom";
import asyncloadperson, { removeperson } from "../store/actions/personAction";
import HorizontalCards from "../templates/HorizontalCards";
import { ArrowLeft, Globe, Facebook, Instagram, Twitter } from "lucide-react";
import StateDisplay from "../templates/StateDisplay";
import PersonDetailSkeleton from "../templates/loaders/PersonDetailSkeleton";
function Persondetails() {
  const { info, error } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (error) {
    return (
      <StateDisplay
        type="error"
        message={`Person not found or API failed. (${error})`}
      />
    );
  }

  if (!info) {
    return <PersonDetailSkeleton />;
  }
  console.log(info);
  return (
    <div className="px-4 sm:px-[5%] w-full flex flex-col bg-background min-h-screen py-8">
      <nav className="h-[8vh] flex items-center text-muted-foreground text-lg sm:text-xl gap-6">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        <div className="flex flex-col items-center lg:items-start">
          <img
            className="w-[80%] lg:w-full max-h-[65vh] object-cover object-top shadow-lg rounded-lg"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt={info.detail.name}
          />
          <hr className="mt-5 border-border w-full h-px" />

          <div className="text-2xl text-muted-foreground flex gap-4 mt-4">
            {info.externalids.wikidata_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}
                className="hover:text-foreground"
              >
                <Globe />
              </a>
            )}
            {info.externalids.facebook_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${info.externalids.facebook_id}`}
                className="hover:text-foreground"
              >
                <Facebook />
              </a>
            )}
            {info.externalids.instagram_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.instagram.com/${info.externalids.instagram_id}`}
                className="hover:text-foreground"
              >
                <Instagram />
              </a>
            )}
            {info.externalids.twitter_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.twitter.com/${info.externalids.twitter_id}`}
                className="hover:text-foreground"
              >
                <Twitter />
              </a>
            )}
          </div>

          <div className="mt-5 text-muted-foreground w-full">
            <h1 className="text-xl text-foreground font-semibold mb-3">
              Personal Info
            </h1>

            <p className="mt-2">
              <strong className="text-foreground">Known For: </strong>
              {info.detail.known_for_department || "Not Available"}
            </p>

            <p className="mt-2">
              <strong className="text-foreground">Gender: </strong>
              {info.detail.gender === 2
                ? "Male"
                : info.detail.gender === 1
                ? "Female"
                : "Not Available"}
            </p>

            <p className="mt-2">
              <strong className="text-foreground">Birthday: </strong>
              {info.detail.birthday || "Not Available"}
            </p>

            <p className="mt-2">
              <strong className="text-foreground">Place of Birth: </strong>
              {info.detail.place_of_birth || "Not Available"}
            </p>

            {info.detail.deathday && (
              <p className="mt-2">
                <strong className="text-foreground">Deathday: </strong>
                {info.detail.deathday}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl text-foreground font-bold mb-5">
            {info.detail.name || "Not Available"}
          </h1>
          <h2 className="text-xl text-muted-foreground font-semibold mb-3">
            Biography
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {info.detail.biography || "No biography available."}
          </p>

          <h2 className="text-2xl text-muted-foreground mt-8 mb-4">
            Known For
          </h2>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  );
}

export default Persondetails;
