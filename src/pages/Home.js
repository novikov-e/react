import {useLayoutEffect, useRef, useState} from 'react';
import device from 'current-device';
import angular from '../svg/logos/angular.svg';
import axios from '../svg/logos/axios.svg';
import babel from '../svg/logos/babel.svg';
import bootstrap from '../svg/logos/bootstrap.svg';
import css from '../svg/logos/css.png';
import django from '../svg/logos/django.svg';
import docker from '../svg/logos/docker.svg';
import electron from '../svg/logos/electron.svg';
import emmet from '../svg/logos/emmet.svg';
import eslint from '../svg/logos/eslint.svg';
import figma from '../svg/logos/figma.svg';
import gatsby from '../svg/logos/gatsby.svg';
import git from '../svg/logos/git.svg';
import gitlab from '../svg/logos/gitlab.svg';
// import gradle from '../svg/logos/gradle.svg'
import html from '../svg/logos/html.png';
import idea from '../svg/logos/idea.svg';
import java from '../svg/logos/java.svg';
import javascript from '../svg/logos/javascript.png';
import liquibase from '../svg/logos/liquibase.svg';
import maven from '../svg/logos/maven.svg';
import mui from '../svg/logos/mui.svg';
import node from '../svg/logos/node.svg';
import npm from '../svg/logos/npm.svg';
import postgresql from '../svg/logos/postgresql.svg';
import prettier from '../svg/logos/prettier.svg';
// import python from '../svg/logos/python.svg'
import react from '../svg/logos/react.svg';
// import reactHookForm from '../svg/logos/react-hook-form.svg'
import reactRouter from '../svg/logos/react-router.svg';
import redux from '../svg/logos/redux.svg';
import rxjs from '../svg/logos/rxjs.png';
import sass from '../svg/logos/sass.png';
import spring from '../svg/logos/spring.svg';
// import sqlite from '../svg/logos/sqlite.svg'
// import sqliteSquare from '../svg/logos/sqlite-square.svg'
import storybook from '../svg/logos/storybook.svg';
import ts from '../svg/logos/ts.svg';
import tslint from '../svg/logos/tslint.svg';
import webpack from '../svg/logos/webpack.svg';

//Размер компонента
//Ширина = Ширина * 2
//Высота = Ширина

//Какой должен быть размер что бы при слайде и вращении экран всегда был заполнен

//Максимальные размеры ячейки
//Диагональ ячейки
//Количество ячеек способное уместиться на странице
//Определённый порядок

export default function Home(props) {
  const content = useRef();
  const skillsCount = 40;
  const [contentSize, setContentSize] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useLayoutEffect(() => {
    const {clientWidth, clientHeight} = content.current;
    const size = Math.round(Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)));
    const top = -Math.round((size - clientHeight) / 2);
    const left = -Math.round((size - clientWidth) / 2);
    setContentSize(size);
    setTop(top);
    setLeft(left);
    //Допустимые размеры ячейки для данного размера компонента
    //1600x720
    //2340x1080
    //3120x1440

    //Размеры компонентов определять в зависимости от размеров главной страницы
    //И в зависимости от типа устройства
    //Устанавливать размеры кнопок и иконок в зависимости

    //Extra small < 576px
    //Small ≥ 576px
    //Medium ≥ 768px
    //Large ≥ 992px
    //X-Large ≥ 1200px
    //XX-Large ≥ 1400px

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    console.log('Разрешение ', screenWidth, 'x', screenHeight);
    console.log(device.type);
    device.onChangeOrientation(newOrientation => {
      console.log(`New orientation is ${newOrientation}`);
    });
  }, []);

  return (
    <div
      ref={content}
      className="height-100 flex-column overflow-x-hidden overflow-y-hidden"
      style={{position: 'relative'}}
    >
      <div className="rotation-container" style={{height: contentSize, width: contentSize, top, left}}>
        <img src={angular} alt="HTML5" className="angular" />
        <img src={axios} alt="HTML5" className="axios" />
        <img src={babel} alt="HTML5" className="babel" />
        <img src={bootstrap} alt="Bootstrap" className="bootstrap" />
        <img src={css} alt="CSS" className="css" />
        <img src={django} alt="HTML5" className="django" />
        <img src={docker} alt="HTML5" className="docker" />
        <img src={electron} alt="HTML5" className="electron" />
        <img src={emmet} alt="Emmet" className="emmet" />
        <img src={eslint} alt="HTML5" className="eslint" />
        <img src={figma} alt="HTML5" className="figma" />
        <img src={gatsby} alt="HTML5" className="gatsby" />
        <img src={git} alt="HTML5" className="git" />
        <img src={gitlab} alt="HTML5" className="gitlab" />
        {/*<img src={gradle} alt="HTML5" className="gradle"/>*/}
        <img src={html} alt="HTML5" className="html" />
        <img src={idea} alt="HTML5" className="idea" />
        <img src={java} alt="HTML5" className="java" style={{zIndex: -1}} />
        <img src={javascript} alt="JavaScript" className="javascript" />
        <img src={liquibase} alt="HTML5" className="liquibase" />
        <img src={maven} alt="HTML5" className="maven" />
        <img src={mui} alt="HTML5" className="mui" />
        <img src={node} alt="HTML5" className="node" />
        <img src={npm} alt="HTML5" className="npm" />
        <img src={postgresql} alt="HTML5" className="postgresql" />
        <img src={prettier} alt="HTML5" className="prettier" />
        {/*<img src={python} alt="HTML5" className="python"/>*/}
        <img src={react} alt="HTML5" className="react" />
        {/*<img src={reactHookForm} alt="HTML5" className="react-hook-form"/>*/}
        <img src={reactRouter} alt="HTML5" className="react-router" />
        <img src={redux} alt="HTML5" className="redux" />
        <img src={rxjs} alt="HTML5" className="rxjs" />
        <img src={sass} alt="Sass" className="sass" />
        <img src={spring} alt="HTML5" className="spring" />
        {/*<img src={sqlite} alt="HTML5" className="sqlite"/>*/}
        <img src={storybook} alt="HTML5" className="storybook" />
        <img src={ts} alt="HTML5" className="ts" />
        <img src={tslint} alt="HTML5" className="tslint" />
        <img src={webpack} alt="HTML5" className="webpack" />
      </div>
    </div>
  );
}
