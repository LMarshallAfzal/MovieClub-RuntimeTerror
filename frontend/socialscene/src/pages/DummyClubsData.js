import React from "react";
import icon3 from "../styling/example icons/club3.png";
import icon4 from "../styling/example icons/club4.png";
import icon5 from "../styling/example icons/club5.png";
import icon6 from "../styling/example icons/club6.png";
import icon7 from "../styling/example icons/club7.png";
import icon1 from "../styling/example icons/club1.png";
import icon2 from "../styling/example icons/club2.png";

export const DummyClubData = [
        {ID: "1", clubName: "Some Club", isMember: false, iconImage: icon3, description: "some people in a club", isOrganiser: false, clubTheme: "action", memberRole: ""},
        {ID: "2", clubName: "Terminators", isMember: false, iconImage: icon4, description: "ARNOLD", isOrganiser: false, clubTheme: "adventure", memberRole: ""},
        {ID: "3", clubName: "runtimeTerror", isMember: false, iconImage: icon5, description: "the boys hangout", isOrganiser: false, clubTheme: "X-Rated", memberRole: ""},
        {ID: "4", clubName: "Another Club", isMember: false, iconImage: icon6, description: "horror and action", isOrganiser: false, clubTheme: "rom-com", memberRole: ""},
        {ID: "5", clubName: "modern movies", isMember: false, iconImage: icon7, description: "classics with new films", isOrganiser: false, clubTheme: "black & white", memberRole: ""},
        {ID: "6", clubName: "Movie Club", isMember: true, iconImage: icon1, description: "the main club", isOrganiser: false, clubTheme: "cartoon", memberRole: "MEMBER"},
        {ID: "7", clubName: "Horror Hoes", isMember: true, iconImage: icon2, description: "horror films", isOrganiser: true, clubTheme: "horror", memberRole: "OWNER"}
    ]