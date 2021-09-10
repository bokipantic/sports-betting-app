<!DOCTYPE html>
<html>
<head>
	<title>Kladionica</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
		integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">
</head>
<body onload="proveriToken(); ucitaj();">
	<?php include "include/navbar.php"; ?>

	<div class="container">
		<div class="row">
            <div class="col-lg-12">
                <div class="well">
                    <h2 class="text-center">Dodaj utakmicu</h2>
                    <br>
                    <div class="form-inline">
                        <div class="form-group">
                            <select class="form-control timovi" id="tim1">
                                <option value="">Izaberi tim 1...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control timovi" id="tim2">
                                <option value="">Izaberi tim 2...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="kvota1" placeholder="Kvota za ishod 1...">
                        </div>
                        <div class="form-group">
                            <input type="text" id="kvotax" class="form-control" placeholder="Kvota za ishod X...">
                        </div>
                        <div class="form-group">
                            <input type="text" id="kvota2" class="form-control" placeholder="Kvota za ishod 2...">
                        </div>
                        <br><br>
                        <button type="button" onclick="dodajUtakmicu();" class="btn btn-primary btn-block">Dodaj utakmicu</button>
                      </div>
                </div>
            </div>
        </div>
		<div class="row">
			<div class="col-lg-12">
                <h2 class="text-center">Lista utakmica</h2>
                <br>
				<table class="table" id="dostupne_utakmice">
					<thead>
						<tr>
							<th>Tim 1</th>
							<th>Tim 2</th>
							<th>Ishod 1</th>
                            <th>Ishod X</th>
							<th>Ishod 2</th>
                            <th>Konacan rezultat</th>
						</tr>
					</thead>
					<tbody></tbody>
                </table>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
		integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
		crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

	<script src="utakmice.js"></script>
	<script src="funkcije.js"></script>
</body>
</html>