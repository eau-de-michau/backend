var promise = require ('bluebird');
var options = {
promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:8000/liczniki';
var db = pgp(connectionString);

module.exports = {
createLicznik: createLicznik,
removeLicznik: removeLicznik,
showAllLicznik: showAllLicznik,
showOneLicznik: showOneLicznik,
showPattern: showPattern
};

function createLicznik(req, res, next) {
    req.body = parseInt(req.body);
    db.none('INSERT INTO tabelalicznikow(ID, MIESIACROK, KODTARYFY, ZUZYCIEKW, CENAJEDN, KOSZT, KOMENTARZ)' +
        'VALUES(${ID}, ${MIESIACROK}, ${KODTARYFY}, ${ZUZYCIEKW}, ${CENAJEDN}, ${KOSZT}, ${KOMENTARZ})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'OK',
                    message: 'Wprowadzono licznik'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}
function removeLicznik(req, res, next) {
    var IDlicznika = parseInt(req.params.id);
    db.result('DELETE FROM tabelalicznikow WHERE ID = $1', IDlicznika)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'OK',
                    message: `Usunieto ${result.rowCount} licznik`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });

}
function showAllLicznik(req, res, next) {
    db.any('SELECT * FROM tabelalicznikow')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'OK',
                    data: data,
                    message: 'Wyswietlono wszystkie liczniki'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}
function showOneLicznik(req, res, next) {
    var licznikID = parseInt(req.params.id);
    db.one('SELECT * FROM tabelalicznikow WHERE ID = $1', licznikID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'OK',
                    data: data,
                    message: 'Wyswietlono jeden licznik'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}
function showPattern(req, res, next) {
    db.any('SELECT * FROM tabelawzorow')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'OK',
                    data: data,
                    message: 'Wyswietlono wszystkie wzory'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}