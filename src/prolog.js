import { parseModel, parsePoints, parseError } from './parsers';

export let session = pl.create();

export let program = `
:- use_module(library(lists)).
:- use_module(library(random)).

frame(NumPoints, Size, RealModel, Points, LearntModel, Error) :-
    real_model(Size, RealModel),
    create_points(RealModel, Size, NumPoints, Points),
    learn_model(Points, LearntModel),
    compute_error(Size, NumPoints, RealModel, LearntModel, Error).

real_model(Size, [X1-Y1, X2-Y2, X3-Y3, X4-Y4]) :-
    Third is Size // 3,
    TwoThird is 2 * Third,
    Half is Size // 2,
    random(0, Third, X1),
    random(TwoThird, Size, Y1),
    random(TwoThird, Size, X2),
    random(0, Third, Y2),
    XX1 is X1 + 1, random(XX1, Half, X3),
    random(Half, Y1, Y3),
    random(Half, X2, X4),
    YY2 is Y2 + 1, random(YY2, Half, Y4).

create_points(_Model, _Size,  0, []).
create_points([X1-Y1, X2-Y2, X3-Y3, X4-Y4], Size, Num, [X-Y-P|Points]) :-
    Num > 0,
    random(0, Size, X),
    random(0, Size, Y),
    is_point_in_frame([X1-Y1, X2-Y2, X3-Y3, X4-Y4], X-Y, P),
    Num2 is Num - 1,
    create_points([X1-Y1, X2-Y2, X3-Y3, X4-Y4], Size, Num2, Points).

is_point_in_frame(Model, Point, in) :-
    point_in_frame(Model, Point).

is_point_in_frame(Model, Point, out) :-
    \\+ point_in_frame(Model, Point).

point_in_frame([X1-Y1, X2-Y2, X3-Y3, X4-Y4], X-Y) :-
    point_in_rect([X1-Y1, X2-Y2], X-Y),
    \\+ point_in_rect([X3-Y3, X4-Y4], X-Y).

point_in_rect([X1-Y1, X2-Y2], X-Y) :-
    X >= X1, X =< X2,
    Y =< Y1, Y >= Y2.

learn_model(Points, [X1-Y1, X2-Y2, X3-Y3, X4-Y4]) :- 
    learn_outter_rect(Points, [X1-Y1, X2-Y2]),
    learn_inner_rect(Points, [X1-Y1, X2-Y2], [X3-Y3, X4-Y4]).

learn_outter_rect(Points, [MinX-MaxY, MaxX-MinY]) :-
    filter_points(Points, in, InPoints),
    find_max_point(InPoints, MaxX-MaxY),
    find_min_point(InPoints, MinX-MinY).

learn_inner_rect(Points, Rect, [MinX-MaxY, MaxX-MinY]) :-
    filter_points_in_rect(Points, Rect, PointsInsideRect),
    filter_points(PointsInsideRect, out, OutPoints),
    find_max_point(OutPoints, MaxX-MaxY),
    find_min_point(OutPoints, MinX-MinY).

filter_points([], _, []) :- !.
filter_points([X-Y-F|Points], F, [X-Y-F|Filtered]) :-
    filter_points(Points, F, Filtered),
    !.
filter_points([_X-_Y-F1|Points], F2, Filtered) :-
    F1 \\== F2,
    filter_points(Points, F2, Filtered).

filter_points_in_rect([], _Rect, []) :- !.
filter_points_in_rect([X-Y-P|Points], Rect, [X-Y-P|Filtered]) :- 
    point_in_rect(Rect, X-Y),
    filter_points_in_rect(Points, Rect, Filtered),
    !.
filter_points_in_rect([X-Y-_P|Points], Rect, Filtered) :- 
    \\+ point_in_rect(Rect, X-Y),
    filter_points_in_rect(Points, Rect, Filtered).

find_max_point(Points, MaxX-MaxY):-
    find_max_x(Points, MaxX),
    find_max_y(Points, MaxY).

find_min_point(Points, MinX-MinY):-
    find_min_x(Points, MinX),
    find_min_y(Points, MinY).

find_max_x([X-_-_|Points], Max) :- find_max_x(Points, X, Max).
find_max_x([], Max, Max).
find_max_x([X-_-_|Ps], M, Max) :- X > M, find_max_x(Ps, X, Max).
find_max_x([X-_-_|Ps], M, Max) :- X =< M, find_max_x(Ps, M, Max).

find_max_y([_-Y-_|Points], Max) :- find_max_y(Points, Y, Max).
find_max_y([], Max, Max).
find_max_y([_-Y-_|Ps], M, Max) :- Y > M, find_max_y(Ps, Y, Max).
find_max_y([_-Y-_|Ps], M, Max) :- Y =< M, find_max_y(Ps, M, Max).

find_min_x([X-_-_|Points], Min) :- find_min_x(Points, X, Min).
find_min_x([], Min, Min).
find_min_x([X-_-_|Ps], M, Min) :- X < M, find_min_x(Ps, X, Min).
find_min_x([X-_-_|Ps], M, Min) :- X >= M, find_min_x(Ps, M, Min).

find_min_y([_-Y-_|Points], Min) :- find_min_y(Points, Y, Min).
find_min_y([], Min, Min).
find_min_y([_-Y-_|Ps], M, Min) :- Y < M, find_min_y(Ps, Y, Min).
find_min_y([_-Y-_|Ps], M, Min) :- Y >= M, find_min_y(Ps, M, Min).

compute_error(Size, NumP, RealModel, LearntModel, Error) :-
    create_points_error(RealModel, LearntModel, Size, NumP, Points),
    filter_points_in_error(Points, Filtered),
    length(Filtered, Len),
    Error is Len / NumP * 100.

create_points_error(_F1, _F2, _Size, 0, []).
create_points_error(F1, F2, Size, NumPoints, [X-Y-P1-P2|Points]) :-
    NumPoints > 0,
    random(0, Size, X),
    random(0, Size, Y),
    is_point_in_frame(F1, X-Y, P1),
    is_point_in_frame(F2, X-Y, P2),
    Num2 is NumPoints - 1,
    create_points_error(F1, F2, Size, Num2, Points).

filter_points_in_error([], []) :- !.
filter_points_in_error([X-Y-in-out|Points], [X-Y|Filtered]) :- 
    filter_points_in_error(Points, Filtered).
filter_points_in_error([X-Y-out-in|Points], [X-Y|Filtered]) :- 
    filter_points_in_error(Points, Filtered).
filter_points_in_error([_-_-in-in|Points], Filtered) :- 
    filter_points_in_error(Points, Filtered).
filter_points_in_error([_-_-out-out|Points], Filtered) :- 
    filter_points_in_error(Points, Filtered).
`;

export const consultFrame = (numPoints, size, callback) => {
    let goal = `frame(${numPoints}, ${size}, R, P, M, E).`;

    session.consult(program, {
        success: function() {
            session.query(goal, {
                success: function() {
                    session.answer(a => {
                        let r = parseModel(a.lookup("R").toJavaScript());
                        let p = parsePoints(a.lookup("P").toJavaScript());
                        let m = parseModel(a.lookup("M").toJavaScript());
                        let e = parseError(a.lookup("E").toJavaScript());
                        callback(r, p, m, e);
                    });
                }
            });
        }
    });
}