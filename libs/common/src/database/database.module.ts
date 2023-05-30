import { Module } from '@nestjs/common';
import {ModelDefinition, MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {ConfigurableModuleClass} from "@nestjs/common/cache/cache.module-definition";
import {ConfigModule} from "@app/common/config/config.module";

@Module({
    imports:[MongooseModule.forRootAsync({
        imports:[ConfigModule],
        useFactory:(configService:ConfigService)=>({
            uri:configService.get('MONGODB_URI')
        }),
    inject:[ConfigService]
    })],

})
export class DatabaseModule extends ConfigurableModuleClass {
    static  forFeature(models:ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }

}
