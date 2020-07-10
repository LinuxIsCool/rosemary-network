from SpotifyScraper.scraper import Scraper, Request

request = Request().request()

playlist_info = Scraper(session=request).\
        get_playlist_url_info(url=\
        'https://open.spotify.com/playlist/78wrkmYAm9BAd0Ifaa3Kag?si=35S8vJ2_RPyARFY_UmrT4Q')

print(playlist_info)

