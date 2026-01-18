import json

FILES = [
    ( "../media/books.json", "book" ),
    ( "../media/films.json", "film" ),
    ( "../media/shows.json", "show" ),
    ( "../media/games.json", "game" ),
]

output = []

for filename, media_type in FILES:
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)

    for item in data:
        output.append({
            "name": item.get("Title"),
            "imbibed": item.get("Imbibed"),
            "completed": item.get("Completed"),
            "favorite": item.get("Favorite"),
            "type": media_type
        })

with open("../media/media.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)