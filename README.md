# API Advisor

```json
"baseURL": "https://csgo-dashboard-rank.herokuapp.com"
```
---
## Summary
- [Players](#players)
  - [Register players](#register-players)
  - [Errors](#errors-players)
    - [Register a player with an incorrect url](#register-player-with-incorrect-url)
- [Matches](#matches) 
  - [Register matches](#register-matches)
  - [Errors](#errors-matches)
    - [Register match with an incorrect url](#register-match-with-incorrect-url)
    - [Register an already existing match](#register-already-match)
- [Ranks](#ranks)
  - [Kills](#rank-kills-sorted)
    - [Query params](#query-params)
      - [Display all kills with match url](#rank-kills-match_url)

---
## <center>**Players** <a id="players"></a></center>
---

### Register players <a id="register-players"></a>

```
POST - /api/players/
```
Register a player into the database

**Body:**
```json
{
  "url": "https://csgostats.gg/player/76561198062653475"
}
```
Response:
```
HTTP: 200 - OK
```

```json
{
  "playerId": "850fde80-8231-452t-b39c-f9b23695385a",
  "player": "SK|Blavold",
  "imageUrl": "https://avatars.akamai.steamstatic.com/e66064d13f75fe43da64fce740ac29a217f9fd6a_full.jpg",
  "platformCredentials": [
  {
    "platformName": "CSGOSTATS",
    "platformPlayerId": "76561198062653475"
  }
 ]
}
```

<details>
<summary style="font-size:20px;font-weight:bold;color:black">Errors<a id="errors-players"></summary></a>
<a id="register-player-with-incorrect-url"></a>
<details>
<summary>Register a player with an incorrect url</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/matches/76561198382398436"
}
```
Response:
```
HTTP: 400 - BAD REQUEST
```
```json
{
  "status": "error",
  "code": 400,
  "message": {
    "error": "Invalid url received"
  }
}
```
</details>
</details>

---
## <center>**Matches** <a id="matches"></a></center>
---
### Register matches <a id="register-matches"></a>

```
POST - /api/matches/
```

Register a match into the database and also register all registered players stats from that match

**Body:**
```json
{
  "url": "https://csgostats.gg/match/72090725"
}
```
Response:
```
HTTP: 200 - OK
```
```json
{
  "platform": "CSGOSTATS",
  "platformMatchId": "72090725",
  "matchUrl": "https://csgostats.gg/match/72090725",
  "mapName": "de_mirage",
  "date": "2022-07-14T01:03:32.000Z",
  "scoreboard": {
    "team1Rounds": 15,
    "team2Rounds": 15
},
  "players": [
    {
     "player": "SK|Blavold",
     "team": "team2",
     "kills": 40,
     "deaths": 18,
     "assists": 1,
     "killDeathDifference": 22,
     "killDeathRatio": 2.2,
     "averageDamagePerRound": 124.7,
     "headshotPercentage": 0.4,
     "kast": 0.8,
     "enemiesFlashed": 22,
     "flashAssists": 1,
     "enemiesBlindTime": 55.9,
     "utilityDamage": 70,
     "clutch1vx": 1,
     "tradeKills": 10,
     "multikills": {
       "_1k": 13,
       "_2k": 5,
       "_3k": 3,
       "_4k": 2,
       "_5k": 0
      }
    }
  ]
}
```
<details>
<summary style="font-size:20px;font-weight:bold;color:black">Errors</summary><a id="errors-matches"></a>

<a id="register-match-with-incorrect-url"></a>
<details>
<summary>Register match with an incorrect url</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/matches/72090725"
}
```
Response:
```
HTTP: 400 - BAD REQUEST
```
```json
{
  "status": "error",
  "code": 400,
  "message": {
    "error": "Invalid url received"
  }
}
```
</details>

<a id="register-already-match"></a>
<details>
<summary>Register an already existing match</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/match/72090725"
}
```
Response:
```
HTTP: 409 - CONFLICT
```
```json
{
  "status": "error",
  "code": 409,
  "message": {
    "match": "A match with that id was already registered."
  }
}
```
</details>
</details>

---
## <center>**Ranks** <a id="ranks"></a></center>
---

<details>
<summary style="font-size:28px;font-weight:bold;color:black">Kills</summary>
<a id="rank-kills-sorted"></a>


Display the number of kills from the higher to the lower amount

```
GET - /api/ranks/kills/
```

Display the number of kills from all the registered players sorted from the higher to the lower amount

Response:
```
HTTP: 200 - OK
```
```json
[
  {
    "name": "SK|Blavold",
    "kills": 40,
  },
  {
    "name": "SK|Blavold",
    "kills": 40,
  },
  {
    "name": "SK|Blavold",
    "kills": 35,
  },
  {
    "name": "SK|Blavold",
    "kills": 33,
  },
  {
    "name": "Braves",
    "kills": 32,
  },
  {
    "name": "SK|Blavold",
    "kills": 32,
  },
  {
    "name": "SK|Blavold",
    "kills": 30,
  }
]
```

<details>
<summary style="font-size:20px;font-weight:bold;color:black">Query params</summary> <a id="query-params"></a>

<details>
<a id="rank-kills-match_url"></a>
<summary>Display all kills with match url</summary>

```
GET - /api/ranks/kills/?match_url
```
Display the number of kills from all the registered players with a match url for the match that registered that amount of kills 

Response:
```
HTTP: 200 - OK
```
```json
[
  {
    "name": "SK|Blavold",
    "kills": 40,
    "matchUrl": "https://csgostats.gg/match/72090725"
  },
  {
    "name": "SK|Blavold",
    "kills": 40,
    "matchUrl": "https://csgostats.gg/match/52659096"
  },
  {
    "name": "SK|Blavold",
    "kills": 35,
    "matchUrl": "https://csgostats.gg/match/73079023"
  },
  {
    "name": "SK|Blavold",
    "kills": 33,
    "matchUrl": "https://csgostats.gg/match/58067130"
  },
  {
    "name": "Braves",
    "kills": 32,
    "matchUrl": "https://csgostats.gg/match/72965812"
  },
  {
    "name": "SK|Blavold",
    "kills": 32,
    "matchUrl": "https://csgostats.gg/match/58067113"
  },
  {
    "name": "SK|Blavold",
    "kills": 30,
    "matchUrl": "https://csgostats.gg/match/73434211"
  }
]
```
</details>
</details>
</details>

