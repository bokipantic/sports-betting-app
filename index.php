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
				<div class="row">
					<div class="col-lg-5">
						<div class="jumbotron">
							<h1>Kladionica</h1>
							<p>Uplatite tiket</p>
							<p><a class="btn btn-primary btn-lg" href="tiketi.php" role="button">Pogledaj sve tikete</a>
							</p>
						</div>
					</div>
					<div class="col-lg-7">
						<div class="well">
							<h2 class="text-center">Utakmice na tiketu</h2>
							<br>
							<div id="prazan_tiket"></div>
							<div id="tiket">
								<table class="table" id="odigrane_utakmice">
									<thead>
										<tr>
											<th>Tim 1</th>
											<th>Tim 2</th>
											<th>Tip</th>
											<th>Kvota</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<b><div id="ukupna_kvota"></div></b>
								<br>
								<button type="button" class="btn btn-primary" data-toggle="modal"
									data-target="#myModal">Uplati tiket</button>
							</div>
						</div>
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
							<th>Tim domacin</th>
							<th>Tim gost</th>
							<th>Ishod 1</th>
							<th>Ishod X</th>
							<th>Ishod 2</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
							aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Uplata tiketa</h4>
				</div>
				<div class="modal-body">
					<p>Unesite iznos:</p>
					<input type="text" class="form-control" id="uplata" onkeyup="potencijalniDobitak(this.value);">
					<b>Potencijalni dobitak: </b><span id="potencijalni_dobitak">0 rsd</span>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
					<button type="button" class="btn btn-primary" onclick="uplata();">Uplati</button>
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
		integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
		crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

	<script src="index.js"></script>
	<script src="funkcije.js"></script>
</body>
</html>