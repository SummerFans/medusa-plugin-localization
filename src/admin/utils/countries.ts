const countriesMap: Record<string, Record<string, string>> = {
  "af": {
    "country": "Afghanistan",
    "code": "af",
    "locale": "fa-AF"
  },
  "al": {
    "country": "Albania",
    "code": "al",
    "locale": "sq-AL"
  },
  "dz": {
    "country": "Algeria",
    "code": "dz",
    "locale": "ar-DZ"
  },
  "as": {
    "country": "American Samoa",
    "code": "as",
    "locale": "en-AS"
  },
  "ad": {
    "country": "Andorra",
    "code": "ad",
    "locale": "ca-AD"
  },
  "ao": {
    "country": "Angola",
    "code": "ao",
    "locale": "pt-AO"
  },
  "ai": {
    "country": "Anguilla",
    "code": "ai",
    "locale": "en-AI"
  },
  "aq": {
    "country": "Antarctica",
    "code": "aq",
    "locale": "en-AQ"
  },
  "ag": {
    "country": "Antigua and Barbuda",
    "code": "ag",
    "locale": "en-AG"
  },
  "ar": {
    "country": "Argentina",
    "code": "ar",
    "locale": "es-AR"
  },
  "am": {
    "country": "Armenia",
    "code": "am",
    "locale": "hy-AM"
  },
  "aw": {
    "country": "Aruba",
    "code": "aw",
    "locale": "nl-AW"
  },
  "au": {
    "country": "Australia",
    "code": "au",
    "locale": "en-AU"
  },
  "at": {
    "country": "Austria",
    "code": "at",
    "locale": "de-AT"
  },
  "az": {
    "country": "Azerbaijan",
    "code": "az",
    "locale": "az-AZ"
  },
  "bs": {
    "country": "Bahamas",
    "code": "bs",
    "locale": "en-BS"
  },
  "bh": {
    "country": "Bahrain",
    "code": "bh",
    "locale": "ar-BH"
  },
  "bd": {
    "country": "Bangladesh",
    "code": "bd",
    "locale": "bn-BD"
  },
  "bb": {
    "country": "Barbados",
    "code": "bb",
    "locale": "en-BB"
  },
  "by": {
    "country": "Belarus",
    "code": "by",
    "locale": "be-BY"
  },
  "be": {
    "country": "Belgium",
    "code": "be",
    "locale": "nl-BE"
  },
  "bz": {
    "country": "Belize",
    "code": "bz",
    "locale": "en-BZ"
  },
  "bj": {
    "country": "Benin",
    "code": "bj",
    "locale": "fr-BJ"
  },
  "bm": {
    "country": "Bermuda",
    "code": "bm",
    "locale": "en-BM"
  },
  "bt": {
    "country": "Bhutan",
    "code": "bt",
    "locale": "dz-BT"
  },
  "bo": {
    "country": "Bolivia",
    "code": "bo",
    "locale": "es-BO"
  },
  "bq": {
    "country": "Bonaire, Sint Eustatius and Saba",
    "code": "bq",
    "locale": "nl-BQ"
  },
  "ba": {
    "country": "Bosnia and Herzegovina",
    "code": "ba",
    "locale": "bs-BA"
  },
  "bw": {
    "country": "Botswana",
    "code": "bw",
    "locale": "en-BW"
  },
  "bv": {
    "country": "Bouvet Island",
    "code": "bv",
    "locale": "no-BV"
  },
  "br": {
    "country": "Brazil",
    "code": "br",
    "locale": "pt-BR"
  },
  "io": {
    "country": "British Indian Ocean Territory",
    "code": "io",
    "locale": "en-IO"
  },
  "bn": {
    "country": "Brunei Darussalam",
    "code": "bn",
    "locale": "ms-BN"
  },
  "bg": {
    "country": "Bulgaria",
    "code": "bg",
    "locale": "bg-BG"
  },
  "bf": {
    "country": "Burkina Faso",
    "code": "bf",
    "locale": "fr-BF"
  },
  "bi": {
    "country": "Burundi",
    "code": "bi",
    "locale": "fr-BI"
  },
  "kh": {
    "country": "Cambodia",
    "code": "kh",
    "locale": "km-KH"
  },
  "cm": {
    "country": "Cameroon",
    "code": "cm",
    "locale": "fr-CM"
  },
  "ca": {
    "country": "Canada",
    "code": "ca",
    "locale": "en-CA"
  },
  "cv": {
    "country": "Cape Verde",
    "code": "cv",
    "locale": "pt-CV"
  },
  "ky": {
    "country": "Cayman Islands",
    "code": "ky",
    "locale": "en-KY"
  },
  "cf": {
    "country": "Central African Republic",
    "code": "cf",
    "locale": "fr-CF"
  },
  "td": {
    "country": "Chad",
    "code": "td",
    "locale": "fr-TD"
  },
  "cl": {
    "country": "Chile",
    "code": "cl",
    "locale": "es-CL"
  },
  "cn": {
    "country": "China",
    "code": "cn",
    "locale": "zh-CN"
  },
  "cx": {
    "country": "Christmas Island",
    "code": "cx",
    "locale": "en-CX"
  },
  "cc": {
    "country": "Cocos (Keeling) Islands",
    "code": "cc",
    "locale": "en-CC"
  },
  "co": {
    "country": "Colombia",
    "code": "co",
    "locale": "es-CO"
  },
  "km": {
    "country": "Comoros",
    "code": "km",
    "locale": "ar-KM"
  },
  "cg": {
    "country": "Congo",
    "code": "cg",
    "locale": "fr-CG"
  },
  "cd": {
    "country": "Congo, the Democratic Republic of the",
    "code": "cd",
    "locale": "fr-CD"
  },
  "ck": {
    "country": "Cook Islands",
    "code": "ck",
    "locale": "en-CK"
  },
  "cr": {
    "country": "Costa Rica",
    "code": "cr",
    "locale": "es-CR"
  },
  "ci": {
    "country": "Cote D'Ivoire",
    "code": "ci",
    "locale": "fr-CI"
  },
  "hr": {
    "country": "Croatia",
    "code": "hr",
    "locale": "hr-HR"
  },
  "cu": {
    "country": "Cuba",
    "code": "cu",
    "locale": "es-CU"
  },
  "cw": {
    "country": "Curaçao",
    "code": "cw",
    "locale": "nl-CW"
  },
  "cy": {
    "country": "Cyprus",
    "code": "cy",
    "locale": "el-CY"
  },
  "cz": {
    "country": "Czech Republic",
    "code": "cz",
    "locale": "cs-CZ"
  },
  "dk": {
    "country": "Denmark",
    "code": "dk",
    "locale": "da-DK"
  },
  "dj": {
    "country": "Djibouti",
    "code": "dj",
    "locale": "fr-DJ"
  },
  "dm": {
    "country": "Dominica",
    "code": "dm",
    "locale": "en-DM"
  },
  "do": {
    "country": "Dominican Republic",
    "code": "do",
    "locale": "es-DO"
  },
  "ec": {
    "country": "Ecuador",
    "code": "ec",
    "locale": "es-EC"
  },
  "eg": {
    "country": "Egypt",
    "code": "eg",
    "locale": "ar-EG"
  },
  "sv": {
    "country": "El Salvador",
    "code": "sv",
    "locale": "es-SV"
  },
  "gq": {
    "country": "Equatorial Guinea",
    "code": "gq",
    "locale": "es-GQ"
  },
  "er": {
    "country": "Eritrea",
    "code": "er",
    "locale": "ti-ER"
  },
  "ee": {
    "country": "Estonia",
    "code": "ee",
    "locale": "et-EE"
  },
  "et": {
    "country": "Ethiopia",
    "code": "et",
    "locale": "am-ET"
  },
  "fk": {
    "country": "Falkland Islands (Malvinas)",
    "code": "fk",
    "locale": "en-FK"
  },
  "fo": {
    "country": "Faroe Islands",
    "code": "fo",
    "locale": "fo-FO"
  },
  "fj": {
    "country": "Fiji",
    "code": "fj",
    "locale": "en-FJ"
  },
  "fi": {
    "country": "Finland",
    "code": "fi",
    "locale": "fi-FI"
  },
  "fr": {
    "country": "France",
    "code": "fr",
    "locale": "fr-FR"
  },
  "gf": {
    "country": "French Guiana",
    "code": "gf",
    "locale": "fr-GF"
  },
  "pf": {
    "country": "French Polynesia",
    "code": "pf",
    "locale": "fr-PF"
  },
  "tf": {
    "country": "French Southern Territories",
    "code": "tf",
    "locale": "fr-TF"
  },
  "ga": {
    "country": "Gabon",
    "code": "ga",
    "locale": "fr-GA"
  },
  "gm": {
    "country": "Gambia",
    "code": "gm",
    "locale": "en-GM"
  },
  "ge": {
    "country": "Georgia",
    "code": "ge",
    "locale": "ka-GE"
  },
  "de": {
    "country": "Germany",
    "code": "de",
    "locale": "de-DE"
  },
  "gh": {
    "country": "Ghana",
    "code": "gh",
    "locale": "en-GH"
  },
  "gi": {
    "country": "Gibraltar",
    "code": "gi",
    "locale": "en-GI"
  },
  "gr": {
    "country": "Greece",
    "code": "gr",
    "locale": "el-GR"
  },
  "gl": {
    "country": "Greenland",
    "code": "gl",
    "locale": "kl-GL"
  },
  "gd": {
    "country": "Grenada",
    "code": "gd",
    "locale": "en-GD"
  },
  "gp": {
    "country": "Guadeloupe",
    "code": "gp",
    "locale": "fr-GP"
  },
  "gu": {
    "country": "Guam",
    "code": "gu",
    "locale": "en-GU"
  },
  "gt": {
    "country": "Guatemala",
    "code": "gt",
    "locale": "es-GT"
  },
  "gg": {
    "country": "Guernsey",
    "code": "gg",
    "locale": "en-GG"
  },
  "gn": {
    "country": "Guinea",
    "code": "gn",
    "locale": "fr-GN"
  },
  "gw": {
    "country": "Guinea-Bissau",
    "code": "gw",
    "locale": "pt-GW"
  },
  "gy": {
    "country": "Guyana",
    "code": "gy",
    "locale": "en-GY"
  },
  "ht": {
    "country": "Haiti",
    "code": "ht",
    "locale": "ht-HT"
  },
  "hm": {
    "country": "Heard Island And Mcdonald Islands",
    "code": "hm",
    "locale": "en-HM"
  },
  "va": {
    "country": "Holy See (Vatican City State)",
    "code": "va",
    "locale": "it-VA"
  },
  "hn": {
    "country": "Honduras",
    "code": "hn",
    "locale": "es-HN"
  },
  "hk": {
    "country": "Hong Kong",
    "code": "hk",
    "locale": "zh-HK"
  },
  "hu": {
    "country": "Hungary",
    "code": "hu",
    "locale": "hu-HU"
  },
  "is": {
    "country": "Iceland",
    "code": "is",
    "locale": "is-IS"
  },
  "in": {
    "country": "India",
    "code": "in",
    "locale": "hi-IN"
  },
  "id": {
    "country": "Indonesia",
    "code": "id",
    "locale": "id-ID"
  },
  "ir": {
    "country": "Iran, Islamic Republic of",
    "code": "ir",
    "locale": "fa-IR"
  },
  "iq": {
    "country": "Iraq",
    "code": "iq",
    "locale": "ar-IQ"
  },
  "ie": {
    "country": "Ireland",
    "code": "ie",
    "locale": "en-IE"
  },
  "im": {
    "country": "Isle Of Man",
    "code": "im",
    "locale": "en-IM"
  },
  "il": {
    "country": "Israel",
    "code": "il",
    "locale": "he-IL"
  },
  "it": {
    "country": "Italy",
    "code": "it",
    "locale": "it-IT"
  },
  "jm": {
    "country": "Jamaica",
    "code": "jm",
    "locale": "en-JM"
  },
  "jp": {
    "country": "Japan",
    "code": "jp",
    "locale": "ja-JP"
  },
  "je": {
    "country": "Jersey",
    "code": "je",
    "locale": "en-JE"
  },
  "jo": {
    "country": "Jordan",
    "code": "jo",
    "locale": "ar-JO"
  },
  "kz": {
    "country": "Kazakhstan",
    "code": "kz",
    "locale": "kk-KZ"
  },
  "ke": {
    "country": "Kenya",
    "code": "ke",
    "locale": "en-KE"
  },
  "ki": {
    "country": "Kiribati",
    "code": "ki",
    "locale": "en-KI"
  },
  "kp": {
    "country": "Korea, Democratic People's Republic of",
    "code": "kp",
    "locale": "ko-KP"
  },
  "kr": {
    "country": "Korea, Republic of",
    "code": "kr",
    "locale": "ko-KR"
  },
  "xk": {
    "country": "Kosovo",
    "code": "xk",
    "locale": "sq-XK"
  },
  "kw": {
    "country": "Kuwait",
    "code": "kw",
    "locale": "ar-KW"
  },
  "kg": {
    "country": "Kyrgyzstan",
    "code": "kg",
    "locale": "ky-KG"
  },
  "la": {
    "country": "Lao People's Democratic Republic",
    "code": "la",
    "locale": "lo-LA"
  },
  "lv": {
    "country": "Latvia",
    "code": "lv",
    "locale": "lv-LV"
  },
  "lb": {
    "country": "Lebanon",
    "code": "lb",
    "locale": "ar-LB"
  },
  "ls": {
    "country": "Lesotho",
    "code": "ls",
    "locale": "en-LS"
  },
  "lr": {
    "country": "Liberia",
    "code": "lr",
    "locale": "en-LR"
  },
  "ly": {
    "country": "Libya",
    "code": "ly",
    "locale": "ar-LY"
  },
  "li": {
    "country": "Liechtenstein",
    "code": "li",
    "locale": "de-LI"
  },
  "lt": {
    "country": "Lithuania",
    "code": "lt",
    "locale": "lt-LT"
  },
  "lu": {
    "country": "Luxembourg",
    "code": "lu",
    "locale": "lb-LU"
  },
  "mo": {
    "country": "Macao",
    "code": "mo",
    "locale": "zh-MO"
  },
  "mk": {
    "country": "Macedonia, the Former Yugoslav Republic of",
    "code": "mk",
    "locale": "mk-MK"
  },
  "mg": {
    "country": "Madagascar",
    "code": "mg",
    "locale": "mg-MG"
  },
  "mw": {
    "country": "Malawi",
    "code": "mw",
    "locale": "en-MW"
  },
  "my": {
    "country": "Malaysia",
    "code": "my",
    "locale": "ms-MY"
  },
  "mv": {
    "country": "Maldives",
    "code": "mv",
    "locale": "dv-MV"
  },
  "ml": {
    "country": "Mali",
    "code": "ml",
    "locale": "fr-ML"
  },
  "mt": {
    "country": "Malta",
    "code": "mt",
    "locale": "mt-MT"
  },
  "mh": {
    "country": "Marshall Islands",
    "code": "mh",
    "locale": "en-MH"
  },
  "mq": {
    "country": "Martinique",
    "code": "mq",
    "locale": "fr-MQ"
  },
  "mr": {
    "country": "Mauritania",
    "code": "mr",
    "locale": "ar-MR"
  },
  "mu": {
    "country": "Mauritius",
    "code": "mu",
    "locale": "en-MU"
  },
  "yt": {
    "country": "Mayotte",
    "code": "yt",
    "locale": "fr-YT"
  },
  "mx": {
    "country": "Mexico",
    "code": "mx",
    "locale": "es-MX"
  },
  "fm": {
    "country": "Micronesia, Federated States of",
    "code": "fm",
    "locale": "en-FM"
  },
  "md": {
    "country": "Moldova, Republic of",
    "code": "md",
    "locale": "ro-MD"
  },
  "mc": {
    "country": "Monaco",
    "code": "mc",
    "locale": "fr-MC"
  },
  "mn": {
    "country": "Mongolia",
    "code": "mn",
    "locale": "mn-MN"
  },
  "me": {
    "country": "Montenegro",
    "code": "me",
    "locale": "sr-ME"
  },
  "ms": {
    "country": "Montserrat",
    "code": "ms",
    "locale": "en-MS"
  },
  "ma": {
    "country": "Morocco",
    "code": "ma",
    "locale": "ar-MA"
  },
  "mz": {
    "country": "Mozambique",
    "code": "mz",
    "locale": "pt-MZ"
  },
  "mm": {
    "country": "Myanmar",
    "code": "mm",
    "locale": "my-MM"
  },
  "na": {
    "country": "Namibia",
    "code": "na",
    "locale": "en-NA"
  },
  "nr": {
    "country": "Nauru",
    "code": "nr",
    "locale": "en-NR"
  },
  "np": {
    "country": "Nepal",
    "code": "np",
    "locale": "ne-NP"
  },
  "nl": {
    "country": "Netherlands",
    "code": "nl",
    "locale": "nl-NL"
  },
  "nc": {
    "country": "New Caledonia",
    "code": "nc",
    "locale": "fr-NC"
  },
  "nz": {
    "country": "New Zealand",
    "code": "nz",
    "locale": "en-NZ"
  },
  "ni": {
    "country": "Nicaragua",
    "code": "ni",
    "locale": "es-NI"
  },
  "ne": {
    "country": "Niger",
    "code": "ne",
    "locale": "fr-NE"
  },
  "ng": {
    "country": "Nigeria",
    "code": "ng",
    "locale": "en-NG"
  },
  "nu": {
    "country": "Niue",
    "code": "nu",
    "locale": "en-NU"
  },
  "nf": {
    "country": "Norfolk Island",
    "code": "nf",
    "locale": "en-NF"
  },
  "mp": {
    "country": "Northern Mariana Islands",
    "code": "mp",
    "locale": "en-MP"
  },
  "no": {
    "country": "Norway",
    "code": "no",
    "locale": "no-NO"
  },
  "om": {
    "country": "Oman",
    "code": "om",
    "locale": "ar-OM"
  },
  "pk": {
    "country": "Pakistan",
    "code": "pk",
    "locale": "ur-PK"
  },
  "pw": {
    "country": "Palau",
    "code": "pw",
    "locale": "en-PW"
  },
  "ps": {
    "country": "Palestinian Territory, Occupied",
    "code": "ps",
    "locale": "ar-PS"
  },
  "pa": {
    "country": "Panama",
    "code": "pa",
    "locale": "es-PA"
  },
  "pg": {
    "country": "Papua New Guinea",
    "code": "pg",
    "locale": "en-PG"
  },
  "py": {
    "country": "Paraguay",
    "code": "py",
    "locale": "es-PY"
  },
  "pe": {
    "country": "Peru",
    "code": "pe",
    "locale": "es-PE"
  },
  "ph": {
    "country": "Philippines",
    "code": "ph",
    "locale": "fil-PH"
  },
  "pn": {
    "country": "Pitcairn",
    "code": "pn",
    "locale": "en-PN"
  },
  "pl": {
    "country": "Poland",
    "code": "pl",
    "locale": "pl-PL"
  },
  "pt": {
    "country": "Portugal",
    "code": "pt",
    "locale": "pt-PT"
  },
  "pr": {
    "country": "Puerto Rico",
    "code": "pr",
    "locale": "es-PR"
  },
  "qa": {
    "country": "Qatar",
    "code": "qa",
    "locale": "ar-QA"
  },
  "re": {
    "country": "Reunion",
    "code": "re",
    "locale": "fr-RE"
  },
  "ro": {
    "country": "Romania",
    "code": "ro",
    "locale": "ro-RO"
  },
  "ru": {
    "country": "Russian Federation",
    "code": "ru",
    "locale": "ru-RU"
  },
  "rw": {
    "country": "Rwanda",
    "code": "rw",
    "locale": "rw-RW"
  },
  "bl": {
    "country": "Saint Barthélemy",
    "code": "bl",
    "locale": "fr-BL"
  },
  "sh": {
    "country": "Saint Helena",
    "code": "sh",
    "locale": "en-SH"
  },
  "kn": {
    "country": "Saint Kitts and Nevis",
    "code": "kn",
    "locale": "en-KN"
  },
  "lc": {
    "country": "Saint Lucia",
    "code": "lc",
    "locale": "en-LC"
  },
  "mf": {
    "country": "Saint Martin (French part)",
    "code": "mf",
    "locale": "fr-MF"
  },
  "pm": {
    "country": "Saint Pierre and Miquelon",
    "code": "pm",
    "locale": "fr-PM"
  },
  "vc": {
    "country": "Saint Vincent and the Grenadines",
    "code": "vc",
    "locale": "en-VC"
  },
  "ws": {
    "country": "Samoa",
    "code": "ws",
    "locale": "en-WS"
  },
  "sm": {
    "country": "San Marino",
    "code": "sm",
    "locale": "it-SM"
  },
  "st": {
    "country": "Sao Tome and Principe",
    "code": "st",
    "locale": "pt-ST"
  },
  "sa": {
    "country": "Saudi Arabia",
    "code": "sa",
    "locale": "ar-SA"
  },
  "sn": {
    "country": "Senegal",
    "code": "sn",
    "locale": "fr-SN"
  },
  "rs": {
    "country": "Serbia",
    "code": "rs",
    "locale": "sr-RS"
  },
  "sc": {
    "country": "Seychelles",
    "code": "sc",
    "locale": "en-SC"
  },
  "sl": {
    "country": "Sierra Leone",
    "code": "sl",
    "locale": "en-SL"
  },
  "sg": {
    "country": "Singapore",
    "code": "sg",
    "locale": "en-SG"
  },
  "sx": {
    "country": "Sint Maarten",
    "code": "sx",
    "locale": "nl-SX"
  },
  "sk": {
    "country": "Slovakia",
    "code": "sk",
    "locale": "sk-SK"
  },
  "si": {
    "country": "Slovenia",
    "code": "si",
    "locale": "sl-SI"
  },
  "sb": {
    "country": "Solomon Islands",
    "code": "sb",
    "locale": "en-SB"
  },
  "so": {
    "country": "Somalia",
    "code": "so",
    "locale": "so-SO"
  },
  "za": {
    "country": "South Africa",
    "code": "za",
    "locale": "en-ZA"
  },
  "gs": {
    "country": "South Georgia and the South Sandwich Islands",
    "code": "gs",
    "locale": "en-GS"
  },
  "ss": {
    "country": "South Sudan",
    "code": "ss",
    "locale": "en-SS"
  },
  "es": {
    "country": "Spain",
    "code": "es",
    "locale": "es-ES"
  },
  "lk": {
    "country": "Sri Lanka",
    "code": "lk",
    "locale": "si-LK"
  },
  "sd": {
    "country": "Sudan",
    "code": "sd",
    "locale": "ar-SD"
  },
  "sr": {
    "country": "Suriname",
    "code": "sr",
    "locale": "nl-SR"
  },
  "sj": {
    "country": "Svalbard and Jan Mayen",
    "code": "sj",
    "locale": "no-SJ"
  },
  "sz": {
    "country": "Swaziland",
    "code": "sz",
    "locale": "en-SZ"
  },
  "se": {
    "country": "Sweden",
    "code": "se",
    "locale": "sv-SE"
  },
  "ch": {
    "country": "Switzerland",
    "code": "ch",
    "locale": "de-CH"
  },
  "sy": {
    "country": "Syrian Arab Republic",
    "code": "sy",
    "locale": "ar-SY"
  },
  "tw": {
    "country": "Taiwan, Province of China",
    "code": "tw",
    "locale": "zh-TW"
  },
  "tj": {
    "country": "Tajikistan",
    "code": "tj",
    "locale": "tg-TJ"
  },
  "tz": {
    "country": "Tanzania, United Republic of",
    "code": "tz",
    "locale": "sw-TZ"
  },
  "th": {
    "country": "Thailand",
    "code": "th",
    "locale": "th-TH"
  },
  "tl": {
    "country": "Timor Leste",
    "code": "tl",
    "locale": "pt-TL"
  },
  "tg": {
    "country": "Togo",
    "code": "tg",
    "locale": "fr-TG"
  },
  "tk": {
    "country": "Tokelau",
    "code": "tk",
    "locale": "en-TK"
  },
  "to": {
    "country": "Tonga",
    "code": "to",
    "locale": "en-TO"
  },
  "tt": {
    "country": "Trinidad and Tobago",
    "code": "tt",
    "locale": "en-TT"
  },
  "tn": {
    "country": "Tunisia",
    "code": "tn",
    "locale": "ar-TN"
  },
  "tr": {
    "country": "Turkey",
    "code": "tr",
    "locale": "tr-TR"
  },
  "tm": {
    "country": "Turkmenistan",
    "code": "tm",
    "locale": "tk-TM"
  },
  "tc": {
    "country": "Turks and Caicos Islands",
    "code": "tc",
    "locale": "en-TC"
  },
  "tv": {
    "country": "Tuvalu",
    "code": "tv",
    "locale": "en-TV"
  },
  "ug": {
    "country": "Uganda",
    "code": "ug",
    "locale": "en-UG"
  },
  "ua": {
    "country": "Ukraine",
    "code": "ua",
    "locale": "uk-UA"
  },
  "ae": {
    "country": "United Arab Emirates",
    "code": "ae",
    "locale": "ar-AE"
  },
  "gb": {
    "country": "United Kingdom",
    "code": "gb",
    "locale": "en-GB"
  },
  "us": {
    "country": "United States",
    "code": "us",
    "locale": "en-US"
  },
  "um": {
    "country": "United States Minor Outlying Islands",
    "code": "um",
    "locale": "en-UM"
  },
  "uy": {
    "country": "Uruguay",
    "code": "uy",
    "locale": "es-UY"
  },
  "uz": {
    "country": "Uzbekistan",
    "code": "uz",
    "locale": "uz-UZ"
  },
  "vu": {
    "country": "Vanuatu",
    "code": "vu",
    "locale": "en-VU"
  },
  "ve": {
    "country": "Venezuela",
    "code": "ve",
    "locale": "es-VE"
  },
  "vn": {
    "country": "Viet Nam",
    "code": "vn",
    "locale": "vi-VN"
  },
  "vg": {
    "country": "Virgin Islands, British",
    "code": "vg",
    "locale": "en-VG"
  },
  "vi": {
    "country": "Virgin Islands, U.S.",
    "code": "vi",
    "locale": "en-VI"
  },
  "wf": {
    "country": "Wallis and Futuna",
    "code": "wf",
    "locale": "fr-WF"
  },
  "eh": {
    "country": "Western Sahara",
    "code": "eh",
    "locale": "ar-EH"
  },
  "ye": {
    "country": "Yemen",
    "code": "ye",
    "locale": "ar-YE"
  },
  "zm": {
    "country": "Zambia",
    "code": "zm",
    "locale": "en-ZM"
  },
  "zw": {
    "country": "Zimbabwe",
    "code": "zw",
    "locale": "en-ZW"
  },
  "ax": {
    "country": "Åland Islands",
    "code": "ax",
    "locale": "sv-AX"
  }
}

export default countriesMap;