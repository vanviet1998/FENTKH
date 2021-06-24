import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

export interface PanelDto {
     name: string;
     title: string;
     descripsion: string;
     image: string[];
}

export interface ReponsePanelDto {
     panel: PanelDto[];

}