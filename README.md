# API Advisor

```json
"baseURL": "https://csgo-dashboard-rank.herokuapp.com"
```
---
## Summary
- [Players](#players)
  - [Register players](#register-players)
- [Matches](#matches)
  - [Register matches](#register-matches)
- [Ranks](#ranks)
  - [Kills](#rank-kills)
    - [Display all kills sorted by higher to lower](#rank-kills-sorted)  

---
## <center>**Players** <a name="players"></a></center>
---

### Register players <a name="register-players"></a>

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
### Errors
<details>
<summary>Register a player with an incorrect url</summary> <a name="register-player-with-incorrect-url"></a>

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

---
## <center>**Matches** <a name="cities"></a></center>
---
### Register matches <a name="register-matches"></a>

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
### Errors
<details>
<summary>Register match with an incorrect url</summary> <a name="register-match-with-incorrect-url"></a>

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

---
## <center>**Ranks** <a name="ranks"></a></center>
---
### Kills <a name="rank-kills"></a>

```
GET - /api/ranks/kills/
```

Display the kill rank of all registered players sorted by higher to lower and the specific match's url

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
.